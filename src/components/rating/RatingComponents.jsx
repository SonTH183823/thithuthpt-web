import React, {useState} from 'react';
import StarRating from "@/components/feedback/StarRating";
import ButtonPrimary from "@/components/button/ButtonPrimary";

function RatingComponents(props) {
  const [rating, setRating] = useState(0);
  const changeRating = (newRating) => {
    setRating(newRating);
  };
  return (
    <div className={"bg-base-100 p-4 !pt-1 rounded-xl mt-4"}>
      <h3 className="text-lg font-bold">
        Đánh giá
      </h3>
      <div className={'flex flex-row justify-between mb-2'}>
        <StarRating rating={rating} changeRating={changeRating}/>
        <ButtonPrimary
          title="Gửi đánh giá"
          className="float-right px-2"
        />
      </div>
    </div>
  );
}

export default RatingComponents;