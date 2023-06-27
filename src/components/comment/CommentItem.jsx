import {Menu, MenuButton, MenuItem} from "@szhsin/react-menu";
// import { commentAPI } from "apis/comment";
// import { userAPI } from "apis/user";
import moment from "moment";
import "moment/locale/vi";

moment.locale("vi");
import Image from "next/image";
import React, {Fragment, useEffect, useState} from "react";
import Lightbox from "react-image-lightbox";
import CommentInput from "./CommentInput";
import ModalComfirmDeleteComment from "../modal/ModalComfirmDeleteComment";
import Avatar from "../user/Avatar";
import {BigPlayButton, ControlBar, Player} from "video-react";
import CommentBoxReply from "./CommentBoxReply";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage, faVideo} from "@fortawesome/free-solid-svg-icons";
import like from "@/assets/images/svg/like.svg"
import likegray from "@/assets/images/svg/likegray.svg"
import dislike from "@/assets/images/svg/dislike.svg"
import useWindowSize from "../../hooks/useWindowSize";
import {commentAPI} from "../../apis/comment";
import {genURLImage, strToSlug} from "../../utils/common";
import {uploadAPI} from "../../apis/upload";
import {useRouter} from "next/router";


export default function CommentItem(
  {
    statusCmt,
    comment,
    profile,
    setComment,
    setComments,
    handleDeleteComment: handleDeleteCommentProp,
    handleShowMoreReplyComment: showMoreReplyComment,
    handleUpdateComment: handleUpdateCommentProp,
    handlePostCommentReply,
    totalReplyProp,
    typePost,
    postId,
    title,
  }) {
  const [numLike, setNumLike] = useState(0)
  const [numDisLike, setNumDisLike] = useState(0)
  const [statusComment, setStatusCmt] = useState(statusCmt)
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentEditInput, setCommentEditInput] = useState();
  const [newComment, setNewComment] = useState("");
  const [showEditCommentInput, setShowEditCommentInput] = useState(false);
  const [showModalComfirmDelete, setShowModalComfirmDelete] = useState(false);
  const [totalReply, setTotalReply] = useState(null);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);
  const [openLightBox, setOpenLightBox] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const {width} = useWindowSize()
  const router = useRouter()

  const [loadMoreReply, setLoadMoreReply] = useState(
    comment?.firstChild?.length > 1 ? true : false
  );
  const [isClickShowMore, setIsClickShowMore] = useState(false);
  const [loading, setLoading] = useState(null);
  const toggleShowCommentInput = () => {
    setShowCommentInput(!showCommentInput);
    setImageURL("");
    setVideoURL("");
  };

  useEffect(() => {
    setStatusCmt(statusCmt)
  }, [statusCmt]);

  const checkStatusCommentByValue = (val) => {
    return statusComment?.status === val;
  }

  const updateStatus = async (like, dislike) => {
    const data = {
      like,
      dislike
    }
    await commentAPI.updateReactComment(data, comment._id)
  }

  const toggleStatusCmt = async (val) => {
    if (profile._id) {
      let lc = numLike
      let dlc = numDisLike
      if (statusComment) {
        if (statusComment.status === val) {
          setStatusCmt(null)
          if (val === 1) {
            setNumLike(numLike - 1)
            lc = lc - 1
          } else {
            setNumDisLike(numDisLike - 1)
            dlc = dlc - 1
          }
          if (statusComment._id) {
            await commentAPI.deleteStatusComment(statusComment._id)
          } else {
            await commentAPI.deleteStatusCommentNotId(statusCmt)
          }
          await updateStatus(lc, dlc)
        } else {
          const newStt = {
            ...statusComment,
            status: val
          }
          setStatusCmt(newStt)
          if (val === 1) {
            setNumLike(numLike + 1)
            setNumDisLike(numDisLike - 1)
            lc = lc + 1
            dlc = dlc - 1
          } else {
            setNumDisLike(numDisLike + 1)
            setNumLike(numLike - 1)
            lc = lc - 1
            dlc = dlc + 1
          }
          await commentAPI.updateStatusComment(newStt, statusComment._id)
          await updateStatus(lc, dlc)
        }
      } else {
        if (val === 1) {
          setNumLike(numLike + 1)
          lc = lc + 1
        } else {
          setNumDisLike(numDisLike + 1)
          dlc = dlc + 1
        }
        const res = await commentAPI.createStatusComment({
          commentId: comment._id,
          userId: profile._id,
          status: val,
          postId,
          userCmtId: comment.userId?._id,
          title,
          typePost
        })
        setStatusCmt(res)
        await updateStatus(lc, dlc)
      }
    } else {
      const modal = document.getElementById("modal-require-login-id");
      if (modal) {
        modal.click();
      }
    }
  }

  const checkCommentUser = (userId) => {
    return (userId === profile._id || userId?._id === profile._id)
  }

  // useEffect(() => {
  //   if (comment.firstChild) {
  //     setTotalReply(totalReplyProp || 3);
  //     if (totalReplyProp > 1) {
  //       setLoadMoreReply(true);
  //     } else if (
  //       totalReplyProp === totalReply &&
  //       totalReply > 1 &&
  //       !isClickShowMore
  //     ) {
  //       setLoadMoreReply(true);
  //     } else {
  //       setLoadMoreReply(false);
  //     }
  //   }
  // }, [comment]);

  useEffect(() => {
    (async () => {
      if (comment.imageAttach) {
        setImageURL(comment.imageAttach);
      }
      if (comment.videoAttach) {
        setVideoURL(comment.videoAttach);
      }
      setNumLike(comment.like)
      setNumDisLike(comment.dislike)
    })();
  }, [comment]);

  const handleShowEdit = () => {
    setCommentEditInput(comment.content);
    setShowEditCommentInput(!showEditCommentInput);
  };

  const handleUpdateComment = async () => {
    try {
      setLoading(true);
      await handleUpdateCommentProp(
        comment,
        commentEditInput,
        imageURL,
        videoURL
      );
      setLoading(false);
      setShowEditCommentInput(!showEditCommentInput);
    } catch (e) {
      console.log(e);
    }
  };

  const handleShowMoreReplyComment = async () => {
    // let res = null;
    // setIsClickShowMore(true);
    // if (comment?.firstChild?.length === 1) {
    //   res = await commentAPI.getReplyComment({
    //     commentId: comment.id,
    //     offset: 0,
    //     limit,
    //   });
    // } else {
    //   res = await commentAPI.getReplyComment({
    //     commentId: comment.id,
    //     offset,
    //     limit,
    //   });
    // }
    // if (res.replyComments.length > 0) {
    //   showMoreReplyComment([...res.replyComments], comment.id);
    //   setOffset(offset + limit);
    //   if (
    //     totalReply > comment.firstChild.length &&
    //     res.replyComments.length === limit
    //   ) {
    //     setLoadMoreReply(true);
    //   } else {
    //     setLoadMoreReply(false);
    //   }
    // }
  };

  const postCommentReply = (parentId, content) => {
    setShowCommentInput(!showCommentInput);
    handlePostCommentReply(
      parentId,
      content,
      imageURL,
      videoURL,
      comment.userId
    );
    setNewComment("");
  };

  const handleDeleteComment = async () => {
    try {
      const res = await commentAPI.deleteComment(comment._id);
      if (res.ok) {
        handleDeleteCommentProp(comment);
        // setOffset(offset - 1);
        const modal = document.getElementById("modal-delete-cmt");
        if (modal) {
          modal.click();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeInput = async (e) => {
    if (e.target && e.target.files && e.target.files.length) {
      if (e.target.files[0].size > 5 * 1048576) {
        toast.error("Kích thước ảnh tối đa 5MB!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        const res = await uploadAttach(e.target.files[0])
        setImageURL(res.filename);
      }
    }
  };

  const uploadAttach = async (file) => {
    return await uploadAPI.uploadFile(file)
  }
  const handleChangeVideoInput = async (e) => {
    if (e.target && e.target.files && e.target.files.length) {
      if (e.target.files[0].size > 25 * 1048576) {
        toast.error("Kích thước video tối đa 25MB!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        const res = await uploadAttach(e.target.files[0])
        setVideoURL(res.filename);
      }
    }
  };

  const navigateToProfile = () => {
    const user = comment.userId
    router.push(`/profile/${strToSlug(user.name)}-${user._id}`)
  }
  return (
    <div className="pl-3">
      <div className={"flex items-start space-x-3 py-2"}>
        <Avatar
          className={'cursor-pointer'}
          sizeAvatar="w-12"
          onClickAva={navigateToProfile}
          avatar={checkCommentUser(comment.userId) ? profile.avatar : comment?.userId?.avatar}
        />
        <div
          className={`py-3 px-2 bg-base-200 rounded-lg ${
            showEditCommentInput ? "w-full" : "w-fit"
          }`}
        >
          <div className={"flex items-center space-x-2 justify-between"}>
            <div className="flex items-center space-x-1">
              <span className={"font-bold text-primary hover:underline cursor-pointer"} onClick={navigateToProfile}>
                {checkCommentUser(comment.userId) ? profile.name : comment?.userId?.name}
              </span>
              <div className={'w-1 h-1 rounded-full bg-gray-400'}></div>
              <span className={"text-xs text-gray-400"}>
                {moment(comment.createdAt * 1000).fromNow()}
              </span>
            </div>

            <Fragment>
              {checkCommentUser(comment.userId) && (
                <Menu
                  menuButton={
                    <MenuButton>
                      <i className="fa-regular fa-ellipsis"></i>
                    </MenuButton>
                  }
                  transition
                >
                  <MenuItem onClick={handleShowEdit}>
                    <span>Chỉnh sửa</span>
                  </MenuItem>
                  <MenuItem onClick={() => setShowModalComfirmDelete(!showModalComfirmDelete)}>
                    <label htmlFor="modal-comfirm-delete" className="cursor-pointer w-full">Xóa</label>
                  </MenuItem>
                </Menu>
              )}
            </Fragment>
          </div>
          {!showEditCommentInput ? (
            <div className={"py-1"}>
              <p className={""}>{comment.content}</p>
              <div className="flex items-center space-x-5">
                {comment.imageAttach && (
                  <Fragment>
                    <div
                      className="relative w-[160px] h-[120px] cursor-pointer "
                      onClick={() => setOpenLightBox(true)}
                    >
                      <Image
                        alt="img"
                        src={genURLImage(comment.imageAttach)}
                        layout={"fill"}
                        objectFit={"cover"}
                        className={"rounded-lg"}
                      />
                    </div>
                    {openLightBox && (
                      <Lightbox
                        mainSrc={genURLImage(comment.imageAttach)}
                        onCloseRequest={() => setOpenLightBox(false)}
                      />
                    )}
                  </Fragment>
                )}
                {comment.videoAttach && (
                  <div className="h-[150px] w-[250px] relative">
                    <div className="overflow-hidden absolute top-0 bottom-0 left-0 right-0">
                      <Player
                        playsInline
                        src={genURLImage(videoURL)}
                        className={"h-[150px]"}
                      >
                        <ControlBar autoHide={true} className="my-class"/>
                        <BigPlayButton position="center"/>
                      </Player>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full">
              <CommentInput
                comment={commentEditInput}
                setComment={setCommentEditInput}
              />
              {imageURL && (
                <div className={"relative w-fit rounded-lg mt-2"}>
                  <Image
                    src={genURLImage(imageURL)}
                    alt="not found"
                    objectFit="cover"
                    width={100}
                    height={75}
                  />
                  <div
                    className="bg-primary rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-1 cursor-pointer"
                    onClick={() => {
                      setImageURL("")
                    }}
                  >
                    <i className="fa-regular fa-xmark text-white text-sm"></i>
                  </div>
                </div>
              )}

              {videoURL && (
                <div className="h-[100px] w-[150px] relative">
                  <div className="overflow-hidden absolute top-0 bottom-0 left-0 right-0">
                    <Player
                      playsInline
                      src={genURLImage(videoURL)}
                      className={"h-[150px]"}
                    >
                      <ControlBar autoHide={false} className="my-class"/>
                      <BigPlayButton position="center"/>
                    </Player>
                  </div>
                  <div
                    className="bg-primary rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-1 cursor-pointer"
                    onClick={() => setVideoURL("")}
                  >
                    <i className="fa-regular fa-xmark text-white text-sm"></i>
                  </div>
                </div>
              )}
              <div
                className={"flex justify-between items-center space-x-3 mt-2"}
              >
                <div
                  className="cursor-pointer text-primary text-sm"
                  onClick={() => setShowEditCommentInput(!showEditCommentInput)}
                >
                  Hủy bỏ
                </div>
                <div className="flex items-center ">
                  <div className={"flex justify-end cursor-pointer items-center space-x-2"}>
                    <label className={'cursor-pointer h-full w-5'}>
                      <FontAwesomeIcon icon={faImage} className={'text-primary'}/>
                      <input type="file" accept="image/png, image/jpeg" className="hidden cursor-pointer"
                             multiple={false}
                             onChange={(e) => handleChangeInput(e)}/>
                    </label>

                    <label className={'cursor-pointer h-full w-5'}>
                      <FontAwesomeIcon icon={faVideo} className={'text-primary'}/>
                      <input type="file" accept=".mov,.mp4" className="hidden cursor-pointer"
                             multiple={false}
                             onChange={(e) => handleChangeVideoInput(e)}/>
                    </label>
                    <div
                      onClick={handleUpdateComment}
                      className={"cursor-pointer px-3 py-2 bg-primary rounded-lg text-white text-sm font-semibold"}>
                      Cập nhật
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {!showEditCommentInput && !comment.parentId && (
        <div className={"ml-14 flex items-center space-x-3 text-sm select-none"}>
          <div
            className={`ml-3 hover:text-primary cursor-pointer flex items-center ${checkStatusCommentByValue(1) ? 'text-primary' : ''}`}
            onClick={() => toggleStatusCmt(1)}
          >
            <Image src={checkStatusCommentByValue(1) ? like : likegray} alt={''} className={'w-6 h-6'}/>
            {width > 600 ? 'Hữu ích' : ''} ({numLike})
          </div>
          <div className={"w-1 h-1 rounded-full bg-gray-400"}></div>
          <div
            className={`ml-3 hover:text-[#E44D04] cursor-pointer flex items-center ${checkStatusCommentByValue(2) ? 'text-[#E44D04]' : ''}`}
            onClick={() => toggleStatusCmt(2)}
          >
            {checkStatusCommentByValue(2) ? <Image src={dislike} alt={''} className={'w-6 h-6 rotate-180'}/> :
              <Image src={likegray} alt={''} className={'w-6 h-6 rotate-180'}/>}
            {width > 600 ? 'Không hữu ích' : ''} ({numDisLike})
          </div>
          {/*<div className={"w-1 h-1 rounded-full bg-gray-400"}></div>*/}
          {/*<div className={"cursor-pointer"} onClick={toggleShowCommentInput}>*/}
          {/*  {showCommentInput ? (*/}
          {/*    <div>*/}
          {/*      <div className={"px-2 py-1 rounded-md bg-base-200"}>Hủy</div>*/}
          {/*    </div>*/}
          {/*  ) : (*/}
          {/*    <span>Trả lời</span>*/}
          {/*  )}*/}
          {/*</div>*/}
        </div>
      )}
      {showCommentInput && (
        <div className={"ml-14 mt-3 flex flex-1"}>
          <div className={'w-full'}>
            <CommentBoxReply
              // profile={profile}
              // comment={newComment}
              // setComment={setNewComment}
              handlePostComment={() => postCommentReply(comment._id, newComment)}
              profile={profile}
              comment={newComment}
              setComment={setNewComment}
              imageURL={imageURL}
              videoURL={videoURL}
              setImageURL={setImageURL}
              setVideoURL={setVideoURL}
              handleChangeInput={handleChangeInput}
              handleChangeVideoInput={handleChangeVideoInput}
              loading={loading}
            />
          </div>
        </div>
      )}
      {/*{comment?.firstChild ? (*/}
      {/*  <Fragment>*/}
      {/*    {comment.firstChild.map((item, index) => (*/}
      {/*      <div className="pl-12" key={index}>*/}
      {/*        <CommentItem*/}
      {/*          comment={item}*/}
      {/*          handleUpdateComment={handleUpdateCommentProp}*/}
      {/*          profile={profile}*/}
      {/*          handleDeleteComment={handleDeleteCommentProp}*/}
      {/*          setComment={setComment}*/}
      {/*          setComments={setComments}*/}
      {/*          totalReplyProp={item.totalReply}*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*    ))}*/}
      {/*  </Fragment>*/}
      {/*) : (*/}
      {/*  <></>*/}
      {/*)}*/}
      {loadMoreReply && (
        <div
          className="pl-12 py-2 text-primary text-sm cursor-pointer ml-5"
          onClick={handleShowMoreReplyComment}
        >
          Xem thêm trả lời
        </div>
      )}

      {showModalComfirmDelete && (
        <ModalComfirmDeleteComment
          id={"modal-comfirm-delete"}
          handleClick={handleDeleteComment}
        />
      )}
    </div>
  );
}
