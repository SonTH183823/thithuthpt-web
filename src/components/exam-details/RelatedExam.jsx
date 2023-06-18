import React from 'react';
import {genURLImage, kFormatter, strToSlug} from "../../utils/common";
import {formatDate} from "../../utils/moment";
import date from "@/assets/images/svg/calendar.svg";
import Image from "next/image";
import math from "@/assets/images/test/math.jpg";
import list_check from "@/assets/images/svg/list-check.svg";
import TitleExamItem from "@/components/exam/TitleExamItem";
import {useRouter} from "next/router";

function RelatedExam({title, relatedExam}) {
  const router = useRouter()
  const handleClick = (item) => {
    router.push(`/exam/${strToSlug(item.title)}-${item._id}`);
  }
  return (
    <>
      <h3 className="text-lg font-bold !my-2">
        {title ? title : 'Đề thi tương tự'}
      </h3>
      {relatedExam.map(item => (
        <div key={'related-exam-' + item._id} className={'flex items-start mb-3'} onClick={() => handleClick(item)}>
          <div className={'h-[50px] aspect-square mr-2 rounded border-primary border-[1px] mt-1'}>
            <Image
              src={genURLImage(item.thumbnail)}
              alt="thumbnail image"
              placeholder={"blur"}
              width={300}
              height={500}
              blurDataURL={genURLImage(item.thumbnail)}
              className={"rounded object-cover h-full w-full"}
            />
          </div>

          <div>
            <TitleExamItem className={' cursor-pointer hover:text-primary font-semibold'}>{item.title}</TitleExamItem>
            <div>
              <Image
                src={list_check}
                className={"object-cover !inline"}
                alt={""}
                width={16}
                height={16}
              />
              <span className={'text-sm'}>{kFormatter(item.numberTest)} lượt thi - </span>
              <Image
                src={date}
                className={"object-cover !inline"}
                alt={""}
                width={16}
                height={16}
              />
              <span className={'text-sm'}>{formatDate(item.createdAt)}</span>
            </div>
          </div>
        </div>
      ))}

    </>
  );
}

export default RelatedExam;
