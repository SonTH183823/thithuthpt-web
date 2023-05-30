import React from "react";
import StarRatings from "react-star-ratings";
import useWindowSize from "../../hooks/useWindowSize";

const StarRating = ({
                      rating,
                      changeRating,
                      starDimension = "40px",
                      starSpacing = "7px",
                    }) => {
  const {width} = useWindowSize()
  return (
    <div className="flex justify-center flex-1">
      <StarRatings
        rating={rating}
        starSpacing={starSpacing}
        starRatedColor="#facc15"
        starHoverColor="#facc15"
        starDimension={width > 600 ? starDimension : "36px"}
        changeRating={changeRating}
        numberOfStars={5}
        name="rating"
      />
    </div>
  );
};

export default StarRating;
