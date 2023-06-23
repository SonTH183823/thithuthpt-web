import React, {useEffect, useState} from 'react';
import TitleExamItem from "@/components/exam/TitleExamItem";
import {CharacteristicsItem} from "@/components/characteristics/CharacteristicsItem";
import star from "@/assets/images/svg/star.svg";
import time from "@/assets/images/svg/time.svg";
import question from "@/assets/images/svg/question-number.svg";
import list_check from "@/assets/images/svg/list-check.svg";
import {kFormatter, strToSlug} from "../../utils/common";
import list_view from "@/assets/images/svg/list-view.svg";
import date from "@/assets/images/svg/calendar.svg";
import {formatDate} from "../../utils/moment";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import ModalReportPost from "@/components/modal/ModalReportPost";
import ModalShare from "@/components/modal/ModalShare";
import "react-tooltip/dist/react-tooltip.css";
import {Tooltip as ReactTooltip} from "react-tooltip";
import ModalConfirmStartExam from "@/components/modal/ModalConfirmStartExam";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import ButtonSecondary from "@/components/button/ButtonSecondary";
import {ExamAPI} from "../../apis/exam";
import {updateFavoriteExams} from "../../store/exam/exam-slice";
import {toast} from "react-toastify";

function DetailExam({isDoExam = false, isShowRs = true, item, isDoAgain = false}) {
  const router = useRouter();
  const profile = useSelector((state) => state.auth.profile);
  const [isFavorite, setIsFavorite] = useState(null);
  const favoriteExams = useSelector((state) => state.exam.favoriteExams);
  const dispatch = useDispatch();

  useEffect(() => {
    if (favoriteExams) {
      const exam = favoriteExams.find((i) => i.examId._id === item._id);
      if (exam) {
        setIsFavorite(true);
      }
    }
  }, [favoriteExams]);
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
  const handleReport = () => {
    if (profile?._id) {
      const modal = document.getElementById("modal-report-post-id");
      if (modal) {
        modal.click();
      }
    } else {
      const modal = document.getElementById("modal-require-login-id");
      if (modal) {
        modal.click();
      }
    }
  };

  const handleShare = () => {
    const modal = document.getElementById("modal-share-id");
    if (modal) {
      modal.click();
    }
  };
  const startExam = () => {
    if (profile?._id) {
      const modal = document.getElementById("modal-confirm-start-exam-id");
      if (modal) {
        modal.click();
      }
    } else {
      const modal = document.getElementById("modal-require-login");
      if (modal) {
        modal.click();
      }
    }
  };
  const enterExam = () => {
    if (item.subject === 9) {
      router.replace(`/toeic/do-exam/${strToSlug(item.title)}-${item._id}`);
    } else {
      router.replace(`/do-exam/${strToSlug(item.title)}-${item._id}`);
    }
  }
  return (
    <div className={"sm:p-4 p-3"}>
      <div className={"flex justify-between mb-2"}>
        <TitleExamItem
          className={"font-bold text-info text-2xl flex items-center mb-2 cursor-pointer !m-0 !mr-4 hover:!text-black "}>
          {item.title}
        </TitleExamItem>
        <div className={"flex flex-col sm:flex-row sm:space-x-1"}>
          <div
            data-tooltip-id="my-tooltip"
            data-tooltip-content={isFavorite ? 'Bỏ yêu thích' : 'Yêu thích'}
            className="cursor-pointer p-2 h-[30px] w-[30px] flex items-center justify-center"
            onClick={(e) => handleFavorite(e)}
          >
            {isFavorite ? (
              <i className="fa-solid fa-heart text-[#f9595f] text-xl"></i>
            ) : (
              <i className="fa-light fa-heart text-xl"></i>
            )}
          </div>
          <div
            data-tooltip-id="my-tooltip"
            data-tooltip-content={'Chia sẻ'}
            className="cursor-pointer p-2 h-[30px] w-[30px] flex items-center justify-center"
            onClick={(e) => handleShare()}
          >
            <i className="fa-regular fa-share text-xl"></i>
          </div>
          <div
            data-tooltip-id="my-tooltip"
            data-tooltip-content={'Báo cáo'}
            className="cursor-pointer p-2 h-[30px] w-[30px] flex items-center justify-center"
            onClick={(e) => handleReport()}
          ><i className="fa-regular fa-flag text-lg"></i></div>
        </div>
      </div>

      <div className={'bg-base-200 rounded-xl p-3'}>
        <div className={'flex flex-row justify-between space-x-6 mb-3'}>
          <CharacteristicsItem icon={star}>
            {item.rate}
          </CharacteristicsItem>
          <CharacteristicsItem icon={time}>
            {item.time} phút
          </CharacteristicsItem>
          <CharacteristicsItem icon={question}>
            {item.questionIds.length} câu
          </CharacteristicsItem>
        </div>
        <div className={'flex justify-between space-x-6'}>
          <CharacteristicsItem icon={list_check}>
            {kFormatter(item.numberTest)} lượt thi
          </CharacteristicsItem>
          <CharacteristicsItem icon={list_view}>
            {kFormatter(item.numberView)} lượt xem
          </CharacteristicsItem>
          <CharacteristicsItem icon={date}>
            {formatDate(item.createdAt)}
          </CharacteristicsItem>
        </div>

      </div>
      {(isDoExam || isShowRs) ? <div className={'flex justify-between space-x-2 h-14'}>
        {isDoExam && <ButtonPrimary
          title={isDoAgain ? "Làm lại bài thi" : "Bắt đầu làm bài"}
          className="w-full mt-3"
          handleClick={() => startExam()}
        />}
        {isShowRs && <ButtonSecondary
          title="Giải chi tiết"
          className="w-full mt-3 text-sm font-semibold"
          handleClick={() => startExam()}
        />}
      </div> : null}

      <ModalReportPost id="modal-report-post" objectId={item._id}/>
      <ModalShare id="modal-share-post" title={item.title}/>
      <ReactTooltip id='my-tooltip'/>
      <ModalConfirmStartExam id={"modal-confirm-start-exam-id"} handleClick={() => enterExam()}/>
    </div>
  )
}

export default DetailExam;
