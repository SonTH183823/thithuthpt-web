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

function ExamInfo({items}) {
    const item = {
        tradingForm: 1,
        showTitle: true,
        price: 10232434,
        deposit: 12242354,
        createdAt: 1213445,
        title: 'Đề thi THPT Quốc gia năm 2021 môn Lịch sử Mã đề 301',
        category: 4
    }
    const showTitle = true
    return (<div className={"p-4"}>
            <TitleExamItem className={"font-bold text-info flex items-center mb-2 cursor-pointer"}>
                <span>{item.title}</span>
            </TitleExamItem>
            <div className={'bg-base-200 rounded-xl p-3'}>
                <div className={'flex flex-row justify-between space-x-6 mb-3'}>
                    <CharacteristicsItem icon={star}>
                        5.0
                    </CharacteristicsItem>
                    <CharacteristicsItem icon={time}>
                        60 phút
                    </CharacteristicsItem>
                    <CharacteristicsItem icon={question}>
                        50 câu
                    </CharacteristicsItem>
                </div>
                <div className={'flex justify-between space-x-6'}>
                    <CharacteristicsItem icon={list_check}>
                        {kFormatter(1234)} lượt thi
                    </CharacteristicsItem>
                    <CharacteristicsItem icon={list_view}>
                        {kFormatter(12345)} lượt xem
                    </CharacteristicsItem>
                </div>
                {/*<div>*/}
                {/*    Cập nhật ngày: {formatDate(new Date())}*/}
                {/*</div>*/}
            </div>

        </div>
    )
}

export default ExamInfo;