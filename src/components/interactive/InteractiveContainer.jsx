import React, {useEffect, useState} from "react";
import CommentBox from "@/components/comment/CommentBox";
import {useSelector} from "react-redux";
import CommentItem from "../comment/CommentItem";
import Link from "next/link";
import {toast} from "react-toastify";
import {commentAPI} from "../../apis/comment";
import {uploadAPI} from "../../apis/upload";

export default function InteractiveContainer({postId, title, typePost }) {
  const profile = useSelector((state) => state.auth.profile);

  const [perPage, setLimit] = useState(5);
  const [totalComment, setTotalComment] = useState(null);
  const [page, setPage] = useState(1);

  //comment
  const [comments, setComments] = useState([]);
  const [statusComments, setStatusComments] = useState([]);
  const [comment, setComment] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [loading, setLoading] = useState(false);
  const handlePostComment = async () => {
    try {
      setLoading(true);
      const res = await commentAPI.postComment({
        postId,
        userId: profile._id,
        content: comment,
        imageAttach: imageURL,
        videoAttach: videoURL,
        title,
        typePost
      });
      setLoading(false);
      if (res) {
        setComment("");
        setImageURL("");
        setVideoURL("");
        setTotalComment(totalComment + 1);
        setComments([{...res, isEdit: true, isDelete: true}, ...comments]);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const handlePostCommentReply = async (
    parentId,
    content,
    imageBase64,
    videoBase64,
    imageURL,
    videoURL
  ) => {
    try {
      const temp = comments.map((comment) => {
        if (comment.id === parentId) {
          const {firstChild} = comment;
          const {id, avatar, displayName} = profile;
          const temp = {
            content,
            imageAttach: imageURL,
            videoAttach: videoURL,
            userComment: {id, avatar, displayName},
          };
          return {
            ...comment,
            firstChild: firstChild ? [temp, ...firstChild] : [temp],
          };
        }
        return comment;
      });
      setComments([...temp]);
      // const res = await commentAPI.postCommentReply({
      //   parentId,
      //   userId: profile.id,
      //   content,
      //   videoBase64,
      //   imageBase64,
      //   owner,
      //   postId,
      // });
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateComment = async (
    item,
    commentEditInput,
    imageURL,
    videoURL
  ) => {
    try {
      const temps = comments.map((comment) => {
        if (comment._id === item._id) {
          return {
            ...comment,
            content: commentEditInput,
            imageAttach: imageURL,
            videoAttach: videoURL,
          };
        } else {
          return {
            ...comment,
            firstChild: comment.firstChild
              ? comment.firstChild.map((childComment) => {
                if (childComment.id === item.id) {
                  return {
                    ...childComment,
                    content: commentEditInput,
                    imageAttach: imageURL,
                    videoAttach: videoURL,
                  };
                }
                return childComment;
              })
              : null,
          };
        }
      });
      setComments([...temps]);
      const res = await commentAPI.updateComment({
        userId: item.userId._id,
        postId: item.postId,
        content: commentEditInput,
        imageAttach: imageURL,
        videoAttach: videoURL,
      }, item._id);
      if (res.ok) {
        toast.success("Cập nhật thành công!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (e) {
      console.log(e);
      toast.error("Đã có lỗi xảy ra!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleShowMoreReplyComment = async (replyComments, commentId) => {
    const temp = comments.map((comment) => {
      if (comment.id === commentId) {
        const filteredArray = comment.firstChild.filter((item1) => {
          return !replyComments.some(
            (item2) => item2.content === item1.content
          );
        });
        comment.firstChild = [...filteredArray, ...replyComments];
      }
      return comment;
    });
    setComments([...temp]);
  };

  const getCommentStatus = async (listComment) => {
    const commentId = listComment.map(item => item._id).toString()
    return await commentAPI.getStatusComments({commentId})
  }

  const handleShowMoreComment = async () => {
    try {
      const res = await commentAPI.getComments({
        postId,
        page,
        perPage,
      });
      if (res.data) {
        setComments([...comments, ...res.data]);
        const sttCmt = await getCommentStatus(res.data)
        setStatusComments(val => [...val, sttCmt])
        setPage(page + 1);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteComment = (cmt) => {
    let temps = [];
    if (!cmt.parentId) {
      setTotalComment(totalComment - 1);
      temps = comments.filter((comment) => comment._id !== cmt._id);
    } else {
      temps = comments.map((comment) => {
        const {firstChild} = comment;
        return {
          ...comment,
          total: comment.total - 1,
          firstChild: firstChild
            ? firstChild.filter((item) => item.id !== cmt.id)
            : null,
        };
      });
    }
    setComments([...temps]);
  };
  useEffect(() => {
    (async () => {
      try {
        const res = await commentAPI.getComments({
          postId,
          page,
          perPage,
        });
        if (res.data) {
          setPage(2);
          setComments(res.data);
          setTotalComment(res.total);
          if (res.data.length) {
            const statusCmt = await getCommentStatus(res.data)
            setStatusComments(statusCmt)
          }
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [postId]);

  const uploadAttach = async (file) => {
    return await uploadAPI.uploadFile(file)
  }
  const handleChangeInputUploadImage = async (e) => {
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

  const handleChangeInputUploadVideo = async (e) => {
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

  const filterStatusComment = (idCmt) => {
    for (const statusCmt of statusComments) {
      if (statusCmt.commentId === idCmt) {
        return statusCmt
      }
    }
    return null
  }

  return (
    <div>
      <h3>Bình luận</h3>
      {profile._id ? (
        <CommentBox
          postId={postId}
          profile={profile}
          comment={comment}
          setComment={setComment}
          imageURL={imageURL}
          videoURL={videoURL}
          setImageURL={setImageURL}
          setVideoURL={setVideoURL}
          handleChangeInput={handleChangeInputUploadImage}
          handleChangeVideoInput={handleChangeInputUploadVideo}
          handlePostComment={handlePostComment}
          loading={loading}
        />
      ) : (
        <Link href={"/sign-in"}>
          <div className="flex items-center space-x-2 cursor-pointer mb-2">
            <i className="fa-regular fa-circle-user text-3xl"></i>
            <div>Đăng nhập để bình luận.</div>
          </div>
        </Link>
      )}

      <div>
        {comments.length === 0 ? <div className={'my-5 text-center'}>Chưa có bình luận!</div> : <>
          {comments?.map((comment) => (
            <CommentItem
              statusCmt={filterStatusComment(comment._id)}
              comment={comment}
              key={comment._id}
              profile={profile}
              handleDeleteComment={handleDeleteComment}
              handlePostCommentReply={handlePostCommentReply}
              handlePostComment={handlePostComment}
              handleShowMoreReplyComment={handleShowMoreReplyComment}
              handleUpdateComment={handleUpdateComment}
              setComments={setComments}
              setComment={setComment}
              totalReplyProp={comment.total || 3}
              title={title}
              typePost={typePost}
              postId={postId}
            />
          ))}
        </>}
        {totalComment > comments.length && (
          <div
            className="pl-12 py-2 text-primary text-sm  text-center cursor-pointer"
            onClick={handleShowMoreComment}
          >
            Xem thêm bình luận
          </div>
        )}
      </div>
    </div>
  );
}
