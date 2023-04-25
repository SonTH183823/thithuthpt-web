import * as React from "react";
import UserInfo from "../user/UserInfo";
import CharacteristicsItem from "../characteristics/CharacteristicsItem";
import TitlePostItem from "./TitleExamItem";
import Image from "next/image";
import Dot from "../common/Dot";
import { formatPrice, getTradingForm, strToSlug } from "utils/common";
import {
  categoryTitleConfig,
  districtsConfig,
  provincesConfig,
} from "configs/configs";
import { formatDate } from "utils/moment";
import { useRouter } from "next/router";
import ExamTag from "./ExamTag";
// import PostInfo from "./detail-post/PostInfo";

export default function PrimaryExamItem({ post }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/post/${strToSlug(post.title)}-${post.id}`);
  };
  return (
    <div
      className={`md:flex box-shadow rounded-xl relative bg-base-100 cursor-pointer mb-4`}
      onClick={handleClick}
    >
      <div className="w-full h-[200px] md:h-auto md:w-[60%] relative">
        <Image
          src={post?.images[0]}
          layout={"fill"}
          alt={"thumb-nail"}
          className={
            "object-cover md:rounded-tl-xl md:rounded-bl-xl rounded-tl-xl rounded-tr-xl md:rounded-tr-none"
          }
        />
        <ExamTag
          tag={categoryTitleConfig[post.category]}
          category={post.category}
        />
      </div>
      <div className="w-full p-2">
        <div className="flex items-center space-x-1 text-primary">
          <span className="font-bold">
            {formatPrice(post.price)}
            <span> &#8363;</span>
          </span>
          <span className={"text-sm"}>/ tháng</span>
        </div>
        <TitlePostItem className={"font-bold"}>{post.title}</TitlePostItem>
        {/*<CharacteristicsItem icon="fa-regular fa-location-dot">*/}
        {/*  <p className={"text-sm my-2 text-info line-clamp-1"}>*/}
        {/*    {districtsConfig[post.district]}, {provincesConfig[post.province]}*/}
        {/*  </p>*/}
        {/*</CharacteristicsItem>*/}
        {/*<PostInfo item={post} showTitle={false} />*/}
      </div>
    </div>
  );
}
