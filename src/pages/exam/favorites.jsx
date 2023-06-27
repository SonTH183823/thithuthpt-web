import React from "react";
import {useSelector} from "react-redux";
import HomeExamItem from "@/components/exam/HomeExamItem";

const Favorites = () => {
  const favoriteExams = useSelector((state) => state.exam.favoriteExams);
  return (
    <div className="container mx-auto md:py-8 py-2 padding-mobile">
      <h3>Danh sách đề thi yêu thích</h3>
      {favoriteExams?.length ? (
        <div className="md:grid xl:grid-cols-3 md:grid-cols-2 lg:gap-3 gap-1">
          {favoriteExams.map((item) => (
            <HomeExamItem
              key={item._id}
              item={item.examId}
            />
          ))}
        </div>
      ) : (
        <div className="py-8 text-center">
         Bạn chưa yêu thích đề thi nào 😢
        </div>
      )}
    </div>
  );
};

export default Favorites;
