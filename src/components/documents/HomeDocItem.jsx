import React from 'react';
import {useRouter} from "next/router";
import Image from "next/image";
import DocDetail from "./DocDetail"
import DocTag from "@/components/documents/DocTag";
import {genURLImage, strToSlug} from "../../utils/common";

function HomeExamItem({item, isSearch = false}) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/documents/${strToSlug(item.title)}-${item._id}`);
  };
  return (
    <div
      className={`mx-3 box-border rounded-xl relative shrink-0 bg-base-100 cursor-pointer mb-2 box-shadow min-h-[530px] flex flex-col ${isSearch ? "" : "md:w-[372px] w-[360px]"}`}
      onClick={handleClick}
    >
      <div className="relative w-full h-[300px]">
        {item?.thumbnail ? <Image
          src={genURLImage(item.thumbnail)}
          alt="thumbnail image"
          placeholder={"blur"}
          width={1000}
          height={600}
          blurDataURL={genURLImage(item.thumbnail)}
          className={"rounded-tl-xl rounded-tr-xl !h-full object-cover"}
        /> : null}
        <DocTag item={item}/>
      </div>
      <div className={"p-4"}>
        <DocDetail item={item} notShowBtn={false} isHome={true}/>
      </div>
    </div>
  );
}

export default HomeExamItem;
