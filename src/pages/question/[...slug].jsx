import InteractiveContainer from "@/components/interactive/InteractiveContainer";
import TitleSection from "@/components/common/TitleSection";
import React, {Fragment, useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation} from "swiper";
import ModalShare from "@/components/modal/ModalShare";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import HomeExamItem from "@/components/exam/HomeExamItem";
import DetailExam from "@/components/exam/DetailExam";
import StarRating from "@/components/feedback/StarRating";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import BXH from "@/components/exam-details/BXH";
import TableTypeListQues from "@/components/exam-details/TableTypeListQues";
import RelatedExam from "@/components/exam-details/RelatedExam";
import RatingComponents from "@/components/rating/RatingComponents";
import QuestionItem from "@/components/question/QuestionItem";
import QuestionDetail from "@/components/question/QuestionDetail";

export default function Question() {
  const profile = useSelector((state) => state.auth.profile);
  const router = useRouter();
  const [question, setQuestion] = useState({id: 1})
  const [isFavorite, setIsFavorite] = useState(null);
  // const favoritePosts = useSelector((state) => state.post.favoritePosts);
  const favoritePosts = []
  const dispatch = useDispatch();

  // useEffect(() => {
  //     if (favoritePosts && post.id) {
  //         const p = favoritePosts.find((i) => i.post.id === post.id);
  //         if (p) {
  //             setIsFavorite(true);
  //         }
  //     }
  // }, [favoritePosts]);

  // useEffect(() => {
  //     (async () => {
  //         try {
  //             if (post.id) {
  //                 const { province, district, ward, category, tradingForm } = post;
  //                 const res = await PostAPI.getRelatedPost({
  //                     id: post.id,
  //                     data: { province, district, category, tradingForm },
  //                 });
  //                 if (res) {
  //                     setRelatedPosts(res.relatedPosts);
  //                 }
  //             }
  //         } catch (e) {
  //             console.log(e);
  //         }
  //     })();
  // }, []);
  const handleFilterProvince = () => {
    // router.push(`/filter?address=${post.province}`);
  };

  const handleFilterDistrict = () => {
    // router.push(`/filter?address=${post.province},${post.district}`);
  };

  const handleFilterWard = () => {
    // router.push(
    //     `/filter?address=${post.province},${post.district},${post.ward}`
    // );
  };

  const handleFilterCategory = () => {
    // router.push(`/filter?category=${post.category}`);
  };

  const handleReport = () => {
    // if (profile.id) {
    //     const modal = document.getElementById("modal-report-post-id");
    //     if (modal) {
    //         modal.click();
    //     }
    // } else {
    //     const modal = document.getElementById("modal-require-login-id");
    //     if (modal) {
    //         modal.click();
    //     }
    // }
  };

  const handleShare = () => {
    const modal = document.getElementById("modal-share-id");
    if (modal) {
      modal.click();
    }
  };

  const handleFavorite = async () => {
    if (profile.id) {
      const res = await PostAPI.toggleFavorite({
        userId: profile.id,
        postId: post.id,
      });
      setIsFavorite(!isFavorite);
      if (isFavorite) {
        const array = favoritePosts.filter((i) => i.post.id !== post.id);
        dispatch(updateFavoritePosts(array));
      } else {
        let temp = [...favoritePosts];
        temp.push({post: post, userFavorite: profile});
        dispatch(updateFavoritePosts(temp));
      }
      if (res.ok) {
        toast.success("Cập nhật thông tin thành công!", {
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
        toast.error("Đã có lỗi xảy ra!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      const modal = document.getElementById("modal-require-login");
      if (modal) {
        modal.click();
      }
    }
  };

  return (
    <Fragment>
      {question.id ? (
        <div className={"bg-base-200"}>
          <div className="container mx-auto py-2 sm:py-4 padding-mobile">
            <div className="lg:grid grid-cols-3 lg:space-x-4">
              <div className="col-span-2 relative">
                <div className={"bg-base-100 rounded-xl "}>
                  <QuestionDetail question={question}/>
                </div>
                <div className={"bg-base-100 rounded-xl "}>

                </div>
                <div className={"bg-base-100 p-4 !pt-1 rounded-xl mt-4"}>
                  <InteractiveContainer postId={question.id}/>
                </div>
              </div>
              <div className="block col-span-1 lg:flex flex-col">
                <div className={"bg-base-100 rounded-xl px-4 hidden lg:block"}>
                  <BXH idExam={12}/>
                </div>
                <div className={"bg-base-100 rounded-xl px-4 mt-4"}>
                  <RelatedExam idExam={12}/>
                </div>
              </div>
            </div>
          </div>
          {/*<ModalReportPost id={"modal-report-post"} postId={post.id} />*/}
          <ModalShare id={"modal-share-post"} title={question.id}/>
        </div>
      ) : null}
    </Fragment>
  );
}