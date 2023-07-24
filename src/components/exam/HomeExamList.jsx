import React, {Fragment, useState} from "react";
import {useEffect} from "react";
import TitleSection from "../common/TitleSection";
import {Swiper, SwiperSlide, useSwiper} from "swiper/react";
import {Navigation, Autoplay} from "swiper";
import PostSekeleton from "../Sekeleton/PostSekeleton";
import HomeExamItem from "@/components/exam/HomeExamItem";
import {ExamAPI} from "../../apis/exam";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import {useRouter} from "next/router";
import {DocumentAPI} from "../../apis/document";

export default function HomeExamList({title, isDoc = false}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        let res
        if (!isDoc) {
          res = await ExamAPI.filterExam({perPage: 5})
        } else {
          res = await DocumentAPI.filterDocument({perPage: 5})
        }
        setPosts(res.data)
        setLoading(false)
      } catch (e) {
        setLoading(false)
        console.log(e)
      }
    })()
  }, [])
  const handleClick = () => {
    router.push('/filter?outstanding=1')
  }
  return (
    <div className="container">
      <div className="pt-6 pb-8 padding-mobile">
        {loading ? (
          <Fragment>
            <div className="pt-8 flex items-center justify-center">
              <div
                className={
                  "animate-pulse h-6 w-[250px] bg-slate-200 rounded-lg my-2"
                }
              ></div>
            </div>
            <div className="pt-4">
              <div className="grid grid-cols-3 space-x-5">
                <PostSekeleton/>
                <PostSekeleton/>
                <PostSekeleton/>
              </div>
            </div>
          </Fragment>
        ) : (
          <div className="pt-4">
            <TitleSection title={title}/>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              navigation={true}
              modules={[Navigation, Autoplay]}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 5,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
              }}
            >
              {posts.length > 0 &&
                posts.map((item, index) => (
                  <SwiperSlide key={'item' + index}>
                    <HomeExamItem item={item} key={item.id || index}/>
                  </SwiperSlide>
                ))}
            </Swiper>
            <div className="flex justify-center mt-4">
              <ButtonPrimary
                handleClick={handleClick}
                title={"Xem tất cả"}
                className={"w-[200px]"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
