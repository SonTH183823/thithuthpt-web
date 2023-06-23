import React, {useEffect, useState} from 'react';
import StarRating from "@/components/feedback/StarRating";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import {toast} from "react-toastify";
import {RatingAPI} from "../../apis/rate";
import {useSelector} from "react-redux";

function RatingComponents({postId}) {
  const [rating, setRating] = useState(0);
  const [index, setIndex] = useState(1);
  const [hasRate, setRate] = useState(undefined);
  const [start, setStart] = useState(true);
  const profile = useSelector((state) => state.auth.profile);

  useEffect(() => {
    (async () => {
      if (profile._id) {
        const res = await RatingAPI.getRatePostByUserId(postId)
        if (res) {
          setRating(res.star)
          setRate(res)
          setIndex(index + 1)
        }
      }
    })()
  }, [profile])

  const callApi = async () => {
    if (hasRate) {
      await RatingAPI.updateRatePost({
        ...hasRate,
        star: rating
      }, hasRate._id)
    } else {
      await RatingAPI.createRatePost({
        userId: profile._id,
        postId,
        star: rating
      })
    }
  }
  const handleRating = async () => {
    if (profile?._id) {
      if (rating) {
        try {
          await callApi()
          toast.success("Đánh giá thành công!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } catch (e) {
          console.log(e);
          toast.error("Đã có lỗi xảy ra!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } else {
        setStart(false)
      }
    } else {
      const modal = document.getElementById("modal-require-login-id");
      if (modal) {
        modal.click();
      }
    }
  };
  const changeRating = (newRating) => {
    setRating(newRating);
  };
  return (
    <div className={"bg-base-100 p-4 !pt-1 rounded-xl mt-4"}>
      <h3 className="text-lg font-bold">Đánh giá</h3>
      <div className={'flex flex-row justify-between mb-2'} key={'rating-star' + index}>
        <StarRating rating={rating} changeRating={changeRating}/>
        <ButtonPrimary
          title="Gửi đánh giá"
          className="float-right px-2"
          handleClick={handleRating}
        />
      </div>
      {!start && !rating && <div className={'text-red-400'}>Bạn cần chọn giá trị!</div>}
    </div>
  );
}

export default RatingComponents;
