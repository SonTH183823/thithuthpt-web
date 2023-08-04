import * as React from "react";
import Image from "next/image";
import {genURLImage, strToSlug} from "utils/common";
import {useRouter} from "next/router";
import DocDetail from "@/components/documents/DocDetail";
import DocTag from "@/components/documents/DocTag";

export default function PrimaryDocItem({item}) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/documents/${strToSlug(item.title)}-${item._id}`);
  };
  return (
    <div
      className={`md:flex box-shadow rounded-xl relative bg-base-100 cursor-pointer mb-4 min-h-[200px]`}
      onClick={handleClick}
    >
      <div className="w-full h-[200px] md:h-auto md:w-[60%] relative">
        <Image
          src={genURLImage(item.thumbnail)}
          layout={"fill"}
          alt={"thumb-nail"}
          className={"object-cover md:rounded-tl-xl md:rounded-bl-xl rounded-tl-xl rounded-tr-xl md:rounded-tr-none"}
        />
        <DocTag item={item} />
      </div>
      <div className="w-full p-2">
        <DocDetail notShowBtn={false} item={item} isHome={true}/>
      </div>

    </div>
  );
}
