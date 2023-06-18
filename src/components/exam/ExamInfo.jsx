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

function ExamInfo({item}) {
  return (
    <div className={"p-4"}>
      <TitleExamItem className={"font-bold text-info flex items-center mb-2 cursor-pointer"}>
        <span>{item.title}</span>
      </TitleExamItem>
      <div className={'bg-base-200 rounded-xl p-3'}>
        <div className={'flex flex-row justify-between space-x-4 mb-3'}>
          <CharacteristicsItem icon={star}>
            {item.rate}
          </CharacteristicsItem>
          <CharacteristicsItem icon={list_check}>
            {kFormatter(item.numberTest)} lượt thi
          </CharacteristicsItem>
          <CharacteristicsItem icon={list_view}>
            {kFormatter(item.numberView)} lượt xem
          </CharacteristicsItem>
        </div>
        <div className={'flex justify-between space-x-4'}>
          <CharacteristicsItem icon={time}>
            {item.time} phút
          </CharacteristicsItem>
          <CharacteristicsItem icon={question}>
            {item.questionIds.length} câu
          </CharacteristicsItem>
          <CharacteristicsItem icon={date}>
            {formatDate(item.createdAt)}
          </CharacteristicsItem>
        </div>
      </div>

    </div>
  )
}

export default ExamInfo;
