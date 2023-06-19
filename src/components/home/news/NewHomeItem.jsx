import Image from "next/image";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {genURLImage, strToSlug} from "utils/common";
import {formatDate} from "utils/moment";
import NewTag from "@/components/new/NewTag";

export default function NewHomeItem({isHome = false, isPrimary = false, item}) {
  const [tag, setTag] = useState('')
  const router = useRouter();

  useEffect(() => {
    if (item.isOutstanding) {
      setTag('Nổi bật')
    } else if (item.isManyViewed) {
      setTag('Xem nhiều')
    } else {
      setTag('')
    }
  }, [])
  const handleClick = () => {
    const slug = strToSlug(item.title);
    router.push(`/news/${slug}-${item._id}`);
  };
  if (isHome) {
    return (
      <div className="col-span-12 lg:col-span-4 flex justify-center items-center mx-2 lg:mx-0 cursor-pointer"
           onClick={handleClick}>
        <div className="w-full bg-white hover:shadow-xl transition-all duration-300">

          <div className="hidden lg:block">
            <div className={`h-[360px] relative bg-primary`}>
              <Image
                alt={item.title}
                src={genURLImage(item.thumbnail)}
                blurDataURL={genURLImage(item.thumbnail)}
                layout={"fill"}
                className="h-full w-full max-w-[507px] object-cover row-span-1"
                objectFit={"cover"}
              />
            </div>
            <div className={`p-6 row-span-1 h-[200px] ${isPrimary ? 'bg-primary text-white' : 'bg-white'}`}>
              <div className=" xl:text-2xl text-xl font-bold mb-3 line-clamp-2">{item.title}</div>
              <div
                className={`text-gray-400 text-justify text-sm line-clamp-3 ${isPrimary ? 'text-white' : ''}`}>
                {item.description}
              </div>
            </div>
          </div>
          <div className="block lg:hidden relative">
            <div
              className="md:grid grid-cols-3 lg:space-x-5 md:space-x-3 lg:py-4 pb-0 cursor-pointer"
              onClick={handleClick}
            >
              <div className={`relative lg:h-[150px] md:h-[120px] h-[180px] `}>
                <Image
                  alt={item.title}
                  src={genURLImage(item.thumbnail)}
                  blurDataURL={genURLImage(item.thumbnail)}
                  layout={"fill"}
                  objectFit={"cover"}
                />
              </div>
              <div className="col-span-2 my-2 md:my-0 p-2">
                <h2 className="m-0 text-info lg:text-xl text-[16px] line-clamp-2 hover:text-primary">
                  {item.title}
                </h2>
                <p className="leading-6 text-sm line-clamp-2">{item.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div
      className="md:grid grid-cols-3 lg:space-x-5 md:space-x-3 lg:py-4 pb-4 cursor-pointer"
      onClick={handleClick}
    >
      <div className={`relative lg:h-[150px] md:h-[120px] h-[180px] `}>
        <Image
          alt={item.title}
          src={genURLImage(item.thumbnail)}
          className={"rounded-lg"}
          blurDataURL={genURLImage(item.thumbnail)}
          layout={"fill"}
          objectFit={"cover"}
        />
        {tag && <NewTag
          tag={tag}
          category={item.isOutstanding ? 1 : 2}
        />}
        <div className="absolute right-1.5 bottom-1.5 text-white bg-primary rounded-md p-1 text-xs">
          <div
            className="max-w-[200px] line-clamp-1">{item.category && item.category.length ? item.category[0].name : ''}</div>
        </div>
      </div>
      <div className="col-span-2 my-2 md:my-0">
        <div className="text-sm mb-1">{formatDate(item.createdAt)}</div>
        <h2 className="m-0 text-info lg:text-xl text-[16px] line-clamp-2 hover:text-primary">
          {item.title}
        </h2>
        <p className="leading-6 text-sm line-clamp-2">{item.description}</p>
      </div>
    </div>
  );
}
