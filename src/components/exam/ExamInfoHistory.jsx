import React, {Fragment} from 'react';
import TitleExamItem from "@/components/exam/TitleExamItem";
import {formatPrice, kFormatter} from "../../utils/common";
import {CharacteristicsItem} from "@/components/characteristics/CharacteristicsItem";
import Dot from "@/components/common/Dot";
import {formatDate} from "../../utils/moment";
import time from "../../assets/images/svg/time.svg";
import list_view from "../../assets/images/svg/list-view.svg";
import list_check from "../../assets/images/svg/list-check.svg";
import question from "../../assets/images/svg/question-number.svg";
import date from "../../assets/images/svg/calendar.svg";
import star from "../../assets/images/svg/star.svg";

function ExamInfoHistory({items}) {
  const item = {
    showTitle: true,
    price: 10232434,
    deposit: 12242354,
    createdAt: 1213445,
    title: 'Đề thi THPT Quốc gia năm 2021 môn Lịch sử Mã đề 301',
    category: 4
  }
  return (
    <div className={"p-2"}>
      <TitleExamItem className={"font-bold text-info flex items-center mb-2 cursor-pointer"}>
        <span>{item.title}</span>
      </TitleExamItem>
      <div className={'bg-base-200 rounded-xl p-3 flex'}>
        <div className={'flex flex-col items-start space-y-2 flex-1'}>
          <CharacteristicsItem icon={question}>
            Số câu đúng 36/50 câu
          </CharacteristicsItem>
          <CharacteristicsItem icon={time}>
            Thời gian làm bài 59 phút
          </CharacteristicsItem>
          <CharacteristicsItem icon={date}>
            Ngày làm bài {formatDate(new Date())}
          </CharacteristicsItem>
        </div>
        <div>
          <div className="flex items-center text-primary flex-col border border-primary rounded-md">
            <div className={'text-white bg-primary p-2 uppercase text-sm'}>Điểm số</div>
            <div className="font-bold text-xl p-2">9.6</div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ExamInfoHistory;
