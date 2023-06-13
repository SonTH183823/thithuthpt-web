import React, {useEffect, useState} from "react";
import TitleSection from "../common/TitleSection";
import FeedbackItem from "./FeedbackItem";
import {feedbackAPI} from "apis/feedback";
import Image from "next/image";
import feedback_image from "@/assets/images/feedback/feedback.png";
import ModalFeedback from "../modal/ModalFeedback";
// import HorizontalList from "../common/HorizontalList";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Autoplay, Pagination} from "swiper";
import ModalRequireLogin from "../modal/ModalRequireLogin";
import {useSelector} from "react-redux";
import useWindowSize from "hooks/useWindowSize";
import {useRouter} from "next/router";
import ButtonPrimary from "@/components/button/ButtonPrimary";

export default function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState([]);
  const profile = useSelector((state) => state.auth.profile);
  const {width} = useWindowSize();
  const router = useRouter();
  const [isClient, setClient] = useState(false)

  useEffect(() => {
    setClient(true)
  }, [])

  useEffect(() => {
    (async () => {
      try {
        const res = await feedbackAPI.getFeedbacks({active: 1});
        if (res) {
          setFeedbacks(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  const handleLogin = () => {
    const label = document.getElementById("modal-require-login-id");
    label.click();
    router.push(`/sign-in`);
  };

  const showModal = () => {
    const label = document.getElementById("modal-require-login-id");
    label.click();
  };

  return (
    <div className={'padding-mobile bg-backgroundPrimary '}>
      <div className="max-w-[1536px] mx-auto">
        <div className="flex flex-col items-center gap-y-2 pt-8 ">
          <TitleSection className={'uppercase'} title={"Đánh giá"}/>
        </div>
        <div className="pt-4">
          {
            isClient &&
            <Swiper
              slidesPerView={1.33}
              spaceBetween={10}
              loop={true}
              loopFillGroupWithBlank={true}
              className={width > 480 ? "custom-swiper" : ""}
              navigation={width > 480}
              modules={[Navigation]}
              breakpoints={{
                500: {
                  slidesPerView: 1.5,
                  spaceBetween: 5,
                },
                600: {
                  slidesPerView: 1,
                  spaceBetween: 5,
                },
                700: {
                  slidesPerView: 1.5,
                  spaceBetween: 5,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 5,
                },
                1280: {
                  slidesPerView: 2.5,
                  spaceBetween: 5,
                },
                1536: {
                  slidesPerView: 3,
                  spaceBetween: 5,
                },
              }}
            >
              {feedbacks.length > 0 &&
                feedbacks.map((feedback, index) => (
                  <SwiperSlide key={'feedback-' + index}>
                    <FeedbackItem feedback={feedback}/>
                  </SwiperSlide>
                ))}
            </Swiper>
          }
        </div>
        <div className="mt-6 md:mt-[-30px] flex flex-col items-center justify-center space-y-2 pb-8">
          {profile._id ? (
            <label
              htmlFor="modal-feedback"
              className="btn bg-primary hover:cursor-pointer text-white normal-case w-[200px] hover:bg-primary hover:border-primary"
            >
              Nhận xét ngay
            </label>
          ) : (
            <div className="flex justify-center mt-8">
              <ButtonPrimary
                handleClick={showModal}
                title={"Nhận xét ngay"}
                className={"w-[200px]"}
              />
            </div>
          )}
        </div>
      </div>
      <ModalFeedback id={"modal-feedback"}/>
      <ModalRequireLogin handleClick={handleLogin} id={"modal-require-login"}/>
    </div>
  );
}
