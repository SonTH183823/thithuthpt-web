import React, {useEffect, useState} from 'react';
import ExamTag from "@/components/exam/ExamTag";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {categoryTitleConfig} from "../../configs/configs";
import Image from "next/image";
import ExamInfo from "./ExamInfo"
import {genURLImage, strToSlug} from "../../utils/common";
import {toast} from "react-toastify";
import {updateFavoriteExams} from "../../store/exam/exam-slice";
import {ExamAPI} from "../../apis/exam";
import moment from "moment/moment";

function HomeExamItem({item, isSearch = false}) {
  const favoriteExams = useSelector((state) => state.exam.favoriteExams);
  const profile = useSelector((state) => state.auth.profile);
  const [isFavorite, setIsFavorite] = useState(null);
  const [showHeart, setShowHeart] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (favoriteExams) {
      const exam = favoriteExams.find((i) => i.examId._id === item._id);
      if (exam) {
        setIsFavorite(true);
      }
    }
  }, []);

  const handleFavorite = async (e) => {
    e.stopPropagation();
    if (profile._id) {
      setIsFavorite(!isFavorite)
      const res = await ExamAPI.toggleFavorite({
        userId: profile._id,
        examId: item._id,
      });
      setIsFavorite(!isFavorite);
      if (isFavorite) {
        const array = favoriteExams.filter((i) => i.examId._id !== item._id);
        dispatch(updateFavoriteExams(array));
      } else {
        let temp = [...favoriteExams];
        temp.push({examId: item, userId: profile._id});
        dispatch(updateFavoriteExams(temp));
      }
      if (res.ok) {
        toast.success("Cập nhật thông tin thành công!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("Đã có lỗi xảy ra!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      const modal = document.getElementById("modal-require-login");
      if (modal) {
        modal.click();
      }
    }
  };
  const handleClick = () => {
    router.push(`/exam/${strToSlug(item.title)}-${item._id}`);
  };
  return (
    <div
      className={`mx-3 box-border rounded-xl relative shrink-0 bg-base-100 cursor-pointer mb-2 box-shadow ${isSearch ? "" : "md:w-[372px] w-[360px]"}`}
      onClick={handleClick}
    >
      <div className="relative w-full h-[300px]">
        {item?.thumbnail ? <Image
          src={genURLImage(item.thumbnail)}
          alt="thumbnail image"
          placeholder={"blur"}
          width={500}
          height={300}
          blurDataURL={genURLImage(item.thumbnail)}
          className={"rounded-tl-xl rounded-tr-xl !h-full object-cover"}
        /> : null}
        <ExamTag item={item}/>
        {showHeart && (
          <div
            className="cursor-pointer absolute top-2 right-1 p-2 rounded-full bg-slate-700 bg-opacity-50 h-[36px] w-[36px] flex items-center justify-center"
            onClick={(e) => handleFavorite(e)}
          >
            {isFavorite ? (
              <i className="fa-solid fa-heart text-[#f9595f] text-2xl"></i>
            ) : (
              <i className="fa-light fa-heart text-2xl text-white"></i>
            )}
          </div>
        )}
      </div>
      <ExamInfo item={item}/>
    </div>
  );
}

export default HomeExamItem;
