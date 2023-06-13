import * as React from "react";
import {formatDate} from "utils/moment";
import Avatar from "../user/Avatar";
import StarRating from "./StarRating";
import {genURLImage} from "../../utils/common";

export default function FeedbackItem({isBackground, feedback}) {
  return (
    <div
      className={`mr-4 box-shadow sm:w-[500px] w-[280px] sm:h-[210px] h-[395px] rounded-lg text-center sm:flex items-start space-x-5 justify-center p-4 ${
        !isBackground ? "bg-base-100" : "bg-primary"
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="relative w-fit">
          <Avatar sizeAvatar={"w-20"} avatar={genURLImage(feedback.avatar)}/>
          <div
            className={`h-5 w-5 rounded-full absolute bottom-2 right-1 flex items-center justify-center border border-white ${
              !isBackground ? " bg-secondary" : "bg-primary"
            }`}
          >
            <i className="fa-solid fa-quote-right text-white text-xs"></i>
          </div>
        </div>
        <span className="font-bold">{feedback.name}</span>
      </div>
      <div className="flex-1">
        <div className="pt-2 flex flex-col sm:items-start items-center">
          <StarRating
            rating={feedback.star}
            starDimension="24px"
            starSpacing="4px"
          />
        </div>
        <div
          className={`feedback-item sm:max-h-[120px] max-h-[200px] overflow-y-auto my-4 block text-justify pr-4 select-none ${
            isBackground ? "text-backgroundGray" : "text-info"
          }`}
        >
          {feedback.comment}
        </div>
      </div>
    </div>
  );
}
