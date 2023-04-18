import React from "react";
import StarRatings from "react-star-ratings";

const StarRating = ({
  rating,
  changeRating,
  starDimension = "40px",
  starSpacing = "7px",
}) => {
  return (
    <div className="flex justify-center flex-1">
      <StarRatings
        rating={rating}
        starSpacing={starSpacing}
        starRatedColor="#facc15"
        starHoverColor="#facc15"
        starDimension={starDimension}
        changeRating={changeRating}
        numberOfStars={5}
        name="rating"
      />
    </div>
  );
};

export default StarRating;
