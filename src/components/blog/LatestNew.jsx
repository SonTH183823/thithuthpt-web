import Image from "next/image";
import {useRouter} from "next/router";
import React from "react";
import {genURLImage, strToSlug} from "utils/common";
import {formatDate} from "../../utils/moment";

const LatestNew = ({item}) => {
  const router = useRouter();
  const handleDetail = () => {
    const slug = strToSlug(item.title);
    router.push(`/news/${slug}-${item._id}`);
  };
  return (
    <div
      className="flex items-start space-x-3 cursor-pointer w-full"
      onClick={handleDetail}
    >
      <div className="relative w-[130px] h-[74px]">
        <Image
          alt="thumbnail"
          src={genURLImage(item.thumbnail)}
          layout={"fill"}
          objectFit={"cover"}
          className={"rounded-lg w-full"}
        />
      </div>
      <div className={'flex-1'}>
        <span className="font-bold text-sm line-clamp-2 flex-1 hover:text-primary">{item.title}</span>
        <span className="text-sm block">{formatDate(item.createdAt)}</span>
      </div>

    </div>
  );
};

export default LatestNew;
