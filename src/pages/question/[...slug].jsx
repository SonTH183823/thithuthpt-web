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
import ModalReportPost from "@/components/modal/ModalReportPost";
import {QuestionAPI} from "../../apis/question";

export async function getServerSideProps({params}) {
  let question = {};
  try {
    const id = params.slug[0].split("-").slice(-1);
    question = await QuestionAPI.getQuestionById(id)
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      question
    },
  };
}


export default function Question({question}) {
  const profile = useSelector((state) => state.auth.profile);
  const router = useRouter()
  // const favoritePosts = useSelector((state) => state.post.favoritePosts);
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



  return (
    <Fragment>
      {question._id ? (
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
                  <InteractiveContainer postId={question._id}/>
                </div>
              </div>
              <div className="block col-span-1 lg:flex flex-col">
                <div className={"bg-base-100 rounded-xl px-4 hidden lg:block"}>
                  <BXH idExam={12}/>
                </div>
                <div className={"bg-base-100 rounded-xl px-4 mt-4"}>
                  {/*<RelatedExam idExam={12}/>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
}
