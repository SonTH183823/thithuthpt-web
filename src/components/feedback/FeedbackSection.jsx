// import React, { useEffect, useState } from "react";
// import TitleSection from "../common/TitleSection";
// import FeedbackItem from "./FeedbackItem";
// import { feedbackAPI } from "apis/feedback";
// import Image from "next/image";
// import feedback_image from "@/assets/images/feedback/feedback.png";
// import ModalFeedback from "../modal/ModalFeedback";
// import HorizontalList from "../common/HorizontalList";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay, Pagination } from "swiper";
// import ModalRequireLogin from "../modal/ModalRequireLogin";
// import { useSelector } from "react-redux";
// import useWindowSize from "hooks/useWindowSize";
// export default function FeedbackSection() {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const profile = useSelector((state) => state.auth.profile);
//   const { width } = useWindowSize();
//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await feedbackAPI.getFeedbacks({
//           offset: 0,
//           limit: 20,
//           status: 1,
//         });
//         if (res) {
//           setFeedbacks(res.feedbacks);
//         }
//       } catch (e) {
//         console.log(e);
//       }
//     })();
//   }, []);
//   const handleLogin = () => {
//     const label = document.getElementById("modal-require-login-id");
//     label.click();
//     router.push(`/sign-in`);
//   };
//
//   const showModal = () => {
//     const label = document.getElementById("modal-require-login-id");
//     label.click();
//   };
//
//   return (
//     <div>
//       <div className="padding-mobile bg-blue-100 ">
//         <div className="flex flex-col items-center gap-y-2 pt-8">
//           <TitleSection title={"Khách hàng TROTOT nói gì"} />
//         </div>
//         <div className="pt-4">
//           <Swiper
//             slidesPerView={1.33}
//             spaceBetween={10}
//             loop={true}
//             loopFillGroupWithBlank={true}
//             className={width > 480 ? "custom-swiper" : ""}
//             navigation={width > 480 ? true : false}
//             modules={[Navigation]}
//             breakpoints={{
//               640: {
//                 slidesPerView: 2,
//                 spaceBetween: 10,
//               },
//               768: {
//                 slidesPerView: 1.5,
//                 spaceBetween: 5,
//               },
//               1024: {
//                 slidesPerView: 3.5,
//                 spaceBetween: 10,
//               },
//             }}
//           >
//             {feedbacks.length > 0 &&
//               feedbacks.map((feedback) => (
//                 <SwiperSlide key={feedback.id}>
//                   <FeedbackItem feedback={feedback} />
//                 </SwiperSlide>
//               ))}
//           </Swiper>
//         </div>
//         <div className="mt-6 md:mt-0 flex flex-col items-center justify-center space-y-2 pb-8">
//           <h3 className="m-0">Bạn nghĩ gì về dịch vụ của chúng tôi?</h3>
//           <div className="relative w-[400px] h-[200px]">
//             <Image
//               alt="feedback-icon"
//               src={feedback_image}
//               layout={"fill"}
//               objectFit={"contain"}
//             />
//           </div>
//           {profile.id ? (
//             <label
//               htmlFor="modal-feedback"
//               className="btn bg-primary text-white normal-case w-[200px] hover:bg-primary hover:border-primary"
//             >
//               Nhận xét ngay
//             </label>
//           ) : (
//             <div
//               className="btn bg-primary text-white normal-case w-[200px] hover:bg-primary hover:border-primary"
//               onClick={showModal}
//             >
//               Nhận xét ngay
//             </div>
//           )}
//         </div>
//       </div>
//       <ModalFeedback id={"modal-feedback"} />
//       <ModalRequireLogin handleClick={handleLogin} id={"modal-require-login"} />
//     </div>
//   );
// }
