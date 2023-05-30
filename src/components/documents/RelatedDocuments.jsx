import React from 'react';
import {kFormatter} from "../../utils/common";
import {formatDate} from "../../utils/moment";
import date from "@/assets/images/svg/calendar.svg";
import Image from "next/image";
import math from "@/assets/images/test/math.jpg";
import list_view from "@/assets/images/svg/list-view.svg";
import TitleExamItem from "@/components/exam/TitleExamItem";

function RelatedDocuments({idDoc, type}) {
  const list = [0, 1, 2, 3, 4, 5, 6]
  const listType = [
    'Tài liệu liên quan',
    'Mới nhất'
  ]
  return (
    <>
      <h3 className="text-lg font-bold !my-2">
        {type === 0 ? listType[0] : listType[1]}
      </h3>
      {list.map(item => (
        <div key={item} className={'flex items-start mb-3'}>
          <div className={'h-[50px] aspect-square mr-2 rounded border-primary border-[1px] mt-1'}>
            <Image
              src={math}
              alt="thumbnail image"
              placeholder={"blur"}
              blurDataURL={"https://ngocmeow.github.io/ava1.jpg"}
              className={"rounded"}
            />
          </div>

          <div>
            <TitleExamItem className={' cursor-pointer hover:text-primary font-semibold'}>
              Hệ thống bài tập trắc nghiệm phần "Tích phân" được phân dạng và có lời giải chi tiết
            </TitleExamItem>
            <div>
              <Image
                src={list_view}
                className={"object-cover !inline"}
                alt={""}
                width={16}
                height={16}
              />
              <span className={'text-sm'}>{kFormatter(123)} lượt xem - </span>
              <Image
                src={date}
                className={"object-cover !inline"}
                alt={""}
                width={16}
                height={16}
              />
              <span className={'text-sm'}>{formatDate(new Date())}</span>
            </div>
          </div>
        </div>
      ))}

    </>
  );
}

export default RelatedDocuments;
