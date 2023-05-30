import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import eventEmitter from "../../utils/eventEmitter";

export default function FeatureSection({isSmall = false}) {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const onChanegInputSearch = (e) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    eventEmitter.on('clearInputSearch', () => {
      setKeyword('')
    })
  })
  const handleApplySearch = (e) => {
    e.preventDefault();
    if ("keyword" in router.query) {
      delete router.query.keyword;
    }


    if (!Object.keys(router.query).length && keyword) {
      router.push(`/filter?keyword=${keyword}`);
    } else if (keyword) {
      handleGetFilterUrl(`keyword=${keyword}`);
    } else {
      if (!isSmall) {
        router.push('/filter')
      } else {
        handleGetFilterUrl()
      }
    }
  };


  const handleGetFilterUrl = (value) => {
    if (Object.keys(router.query).length) {
      let queryTemp = [];
      for (const key in router.query) {
        queryTemp.push(`${key}=${router.query[key]}`);
      }
      if (value) {
        router.push(`/filter?${queryTemp.join("&")}&${value}`);
      } else {
        router.push(`/filter?${queryTemp.join("&")}`);
      }
    }
  };

  useEffect(() => {
    if (Object.keys(router.query).length) {
      const {keyword} = router.query;
      if (keyword) {
        setKeyword(keyword);
      }
    }
  }, [router.query]);

  return (
    <div className={`${isSmall ? "w-full" : "bg-base-100 md:py-8 pt-8 pb-4"}`}>
      <div className="container mx-auto padding-mobile">
        <form className={'flex w-full'} onSubmit={(e) => handleApplySearch(e)}>
          <div className="mb-4 relative flex flex-1 items-center">
            <i
              className="fa-regular fa-magnifying-glass absolute top-1/2 -translate-y-2/4 left-3 z-10 text-gray-400 text-sm"></i>
            <input
              placeholder="Đề thi bạn đang tìm kiếm?"
              onChange={(e) => onChanegInputSearch(e)}
              value={keyword}
              className={`text-primary w-full py-3 pl-[36px] rounded-lg outline-none focus:border-2 focus:border-primary border border-gray-300 bg-base-100 ${isSmall ? "" : 'rounded-tr-none rounded-br-none'}`}
            />
          </div>
          {!isSmall && <ButtonPrimary title={'Tìm kiếm'} type={'submit'}
                                      className={'px-5 !h-[50px] rounded-tl-none rounded-bl-none'}/>}
        </form>
      </div>
    </div>
  );
}
