import ButtonPrimary from "@/components/button/ButtonPrimary";
import TitleSection from "@/components/common/TitleSection";
import NewSekeleton from "@/components/Sekeleton/NewSekeleton";
import {NewAPI} from "apis/new";
import {useRouter} from "next/router";
import React, {Fragment, useEffect, useState} from "react";
import NewHomeItem from "./NewHomeItem";

export default function NewHomeSection() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push("/blog");
  };
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await NewAPI.getNews({page: 1, perPage: 3, active: 1});
        if (res) setNews(res.data)
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    })();
  }, []);
  const genUINews = () => {
    return (
      <div className={'grid grid-cols-12 gap-5 lg:gap-2 my-8'}>
        {news && news.length > 0 &&
          news.map((item, index) =>
            <NewHomeItem isHome={true} isPrimary={index === 1} key={item._id} item={item}/>)}
      </div>
    )
  }
  return (
    <div className="containerXl mx-auto padding-mobile py-8">
      {loading ? (
        <Fragment>
          <div className="flex items-center justify-center">
            <div className={"animate-pulse h-6 w-[250px] bg-slate-200 rounded-lg my-2"}/>
          </div>
          <NewSekeleton/>
          <NewSekeleton/>
          <NewSekeleton/>
        </Fragment>
      ) : (
        <Fragment>
          <TitleSection className={'uppercase'} title="Tin tức"/>
          {genUINews()}
          <div className="flex justify-center mt-8">
            <ButtonPrimary
              handleClick={handleClick}
              title={"Xem thêm"}
              className={"w-[200px]"}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
}
