import React, {useState} from 'react';
import TitleExamItem from "@/components/exam/TitleExamItem";
import {CharacteristicsItem} from "@/components/characteristics/CharacteristicsItem";
import star from "@/assets/images/svg/star.svg";
import {kFormatter} from "../../utils/common";
import list_view from "@/assets/images/svg/list-view.svg";
import date from "@/assets/images/svg/calendar.svg";
import {formatDate} from "../../utils/moment";
import ModalReportPost from "@/components/modal/ModalReportPost";
import ModalShare from "@/components/modal/ModalShare";
import "react-tooltip/dist/react-tooltip.css";
import {Tooltip as ReactTooltip} from "react-tooltip";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import Link from "next/link";

function DocDetail({item, notShowBtn = true}) {
  const router = useRouter();
  const profile = useSelector((state) => state.auth.profile);
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

  return (
    <div>
      <div className={"flex justify-between mb-2"}>
        <TitleExamItem
          className={"font-bold text-info text-xl flex items-center mb-2 cursor-pointer !m-0 !mr-2 hover:!text-black "}>
          {item.title}
        </TitleExamItem>
        {notShowBtn ? <div className={"flex flex-col sm:flex-row sm:space-x-1"}>
          <Link
            data-tooltip-id="my-tooltip"
            data-tooltip-content={'Tải xuống'}
            className="cursor-pointer p-2 h-[30px] w-[30px] flex items-center justify-center"
            href={item.link}
            target={'_blank'}
          >
            <i className="fa-regular fa-download text-xl"></i>
          </Link>
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
        </div> : null}
      </div>

      <div className={'bg-base-200 rounded-xl p-3'}>
        <div className={'flex justify-between space-x-6'}>
          <CharacteristicsItem icon={star}>
            {item.rate?.toFixed(1)}
          </CharacteristicsItem>
          <CharacteristicsItem icon={list_view}>
            {kFormatter(item.numberView)} lượt xem
          </CharacteristicsItem>
          <CharacteristicsItem icon={date}>
            {formatDate(item.createdAt)}
          </CharacteristicsItem>
        </div>
      </div>
      <div className={'bg-base-200 rounded-xl p-3 mt-3 flex-1 h-full'}>
        <span className={'line-clamp-3'}>{item.description}</span>
      </div>
      <ModalReportPost id="modal-report-document" objectId={item._id}/>
      <ModalShare id="modal-share-document" title={item.title}/>
      <ReactTooltip id={'my-tooltip'}/>
    </div>
  )
}

export default DocDetail;
