import React from 'react';
import {genURLImage, kFormatter, strToSlug} from "../../utils/common";
import {formatDate} from "../../utils/moment";
import date from "@/assets/images/svg/calendar.svg";
import Image from "next/image";
import list_view from "@/assets/images/svg/list-view.svg";
import TitleExamItem from "@/components/exam/TitleExamItem";
import {useRouter} from "next/router";

function RelatedDocuments({relatedDoc, type}) {
  const router = useRouter()
  const listType = [
    'Tài liệu liên quan',
    'Mới nhất'
  ]
  const handleClick = (item) => {
    router.push(`/documents/${strToSlug(item.title)}-${item._id}`);
  }
  if (relatedDoc.length === 0) {
    return null
  }
  const showAll = () => {
    router.push(`/documents?subject=${relatedDoc[0].subject}`);
  }
  return (
    <>
      <div className={'flex items-center justify-between'}>
        <h3 className="text-lg font-bold !my-2">
          {type === 0 ? listType[0] : listType[1]}
        </h3>
        {type === 0 ?
          <div className={'text-sm cursor-pointer select-none hover:underline hover:text-primary'} onClick={showAll}>Xem
            tất cả
          </div> : null}
      </div>
      {relatedDoc.map(item => (
        <div key={'relatedDoc' + item + listType[type || 1]} className={'flex items-start mb-3'}
             onClick={() => handleClick(item)}>
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
            <TitleExamItem className={' cursor-pointer hover:text-primary font-semibold'}>
              {item.title}
            </TitleExamItem>
            <div>
              <Image
                src={list_view}
                className={"object-cover !inline"}
                alt={""}
                width={16}
                height={16}
              />
              <span className={'text-sm'}>{kFormatter(item.numberView)} lượt xem - </span>
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

export default RelatedDocuments;
