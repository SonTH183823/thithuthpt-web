import React, {useState} from 'react';
import TitleExamItem from "@/components/exam/TitleExamItem";
import ModalReportPost from "@/components/modal/ModalReportPost";
import ModalShare from "@/components/modal/ModalShare";
import {Tooltip as ReactTooltip} from "react-tooltip";
import Cookies from "js-cookie";
import examImg from "@/assets/images/exam.jpeg";
import Image from "next/image";

function QuestionDetail({question}) {
  const [showResult, setShow] = useState(false)
  const handleReport = () => {
    const accessToken = Cookies.get(process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY);
    if (accessToken) {
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
  return (
    <div className={"pt-4 px-3"}>
      <Image src={examImg} alt={''} className={''}/>
      <div className="grid grid-cols-3 gap-4 my-2 border-t-2 border-t-primary mx-5 py-2 font-semibold">
        <div
          className={'col-span-1 hover:bg-base-200 cursor-pointer py-2 flex items-center justify-center rounded-sm space-x-1'}
          onClick={() => setShow(!showResult)}>
          <i className="fa-regular fa-check text-xl"></i>
          <span>Lời giải</span>
        </div>
        <div
          className={'col-span-1 hover:bg-base-200 cursor-pointer py-2 flex items-center justify-center rounded-sm space-x-1'}
          onClick={handleShare}>
          <i className="fa-regular fa-share text-xl"></i>
          <span>Chia sẻ</span>
        </div>
        <div
          className={'col-span-1 hover:bg-base-200 cursor-pointer py-2 flex items-center justify-center rounded-sm space-x-1'}
          onClick={handleReport}>
          <i className="fa-regular fa-flag text-lg"/>
          <span>Báo cáo</span>
        </div>
      </div>
      <ModalReportPost id={"modal-report-post"} postId={question.id}/>
      <ModalShare id={"modal-share-post"} title={question.title}/>
      <ReactTooltip id={'my-tooltip'}/>
    </div>
  );
}

export default QuestionDetail;
