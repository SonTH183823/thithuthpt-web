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
import Link from "next/link";

function DocDetail({item, notShowBtn = true, isHome = false}) {
  const [isReadmore, setReadMore] = useState(true)
  const handleShare = () => {
    const modal = document.getElementById("modal-share-id");
    if (modal) {
      modal.click();
    }
  };

  return (
    <div className={'flex h-full flex-col'}>
      <div className={"flex justify-between mb-2"}>
        <TitleExamItem
          className={`${isHome ? 'font-bold text-info flex items-center mb-2 cursor-pointer' : 'font-bold text-info text-xl flex items-center mb-2 cursor-pointer !m-0 !mr-2 hover:!text-black'}`}>
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
        <span className={`${isHome ? 'line-clamp-2' : `${isReadmore ? 'line-clamp-3' : ''}`}`}>{item.description}</span>
        {(item.description.length > 280 && !isHome) ?
          <div className={'w-full flex justify-center items-center'}>
          <span className={'text-primary cursor-pointer'}
                onClick={() => setReadMore(!isReadmore)}>{isReadmore ? 'Đọc thêm' : 'Thu gọn'}</span>
          </div> : <></>}
      </div>
      <ModalReportPost id="modal-report-document" objectId={item._id}/>
      <ModalShare id="modal-share-document" title={item.title}/>
      <ReactTooltip id={'my-tooltip'}/>
    </div>
  )
}

export default DocDetail;
