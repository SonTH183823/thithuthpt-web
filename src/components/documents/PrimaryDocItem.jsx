import * as React from "react";
import UserInfo from "../user/UserInfo";
import {CharacteristicsItemIcon} from "../characteristics/CharacteristicsItem";
import math from "../../assets/images/test/math.jpg"
import Image from "next/image";
import Dot from "../common/Dot";
import {strToSlug} from "utils/common";
import {useRouter} from "next/router";
import ExamInfoHistory from "@/components/exam/ExamInfoHistory";
import ExamTag from "@/components/exam/ExamTag";
import DocDetail from "@/components/documents/DocDetail";

export default function PrimaryDocItem({post1}) {
  const post = {
    title: 'Đề thi thử môn Lý trường THPT Phạm Văn Đồng - Gia Lai - 2019'
  }
  const router = useRouter();
  const handleClick = () => {
    router.push(`/history/${strToSlug(post.title)}-${post.id}`);
  };
  return (
    <div
      className={`md:flex box-shadow rounded-xl relative bg-base-100 cursor-pointer mb-4`}
      onClick={handleClick}
    >
      <div className="w-full h-[200px] md:h-auto md:w-[60%] relative">
        <Image
          // src={post?.images}
          src={math}
          layout={"fill"}
          alt={"thumb-nail"}
          className={
            "object-cover md:rounded-tl-xl md:rounded-bl-xl rounded-tl-xl rounded-tr-xl md:rounded-tr-none"
          }
        />
        <ExamTag
          tag={'Tag ne'}
          category={2}
        />
      </div>
      <div className="w-full p-2">
        <DocDetail notShowBtn={false}/>
      </div>

    </div>
  );
}
