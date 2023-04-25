import ButtonPrimary from "@/components/button/ButtonPrimary";
import ButtonSeeMore from "@/components/button/ButtonSeeMore";
import TitleSection from "@/components/common/TitleSection";
import NewSekeleton from "@/components/Sekeleton/NewSekeleton";
// import { async } from "@firebase/util";
import {NewAPI} from "apis/new";
import {useRouter} from "next/router";
import React, {Fragment, useEffect, useState} from "react";
import NewHomeItem from "./NewHomeItem";

export default function NewHomeSection() {
    const [news, setNews] = useState([1, 2, 3]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleClick = () => {
        router.push("/blog");
    };
    useEffect(() => {
        // (async () => {
        //   try {
        //     setLoading(true);
        //     const res = await NewAPI.getNews({ offset: 0, limit: 5, isActive: 1 });
        //     if (res) {
        //       setNews(res.news);
        //     }
        //     setLoading(false);
        //   } catch (e) {
        //     console.log(e);
        //     setLoading(false);
        //   }
        // })();
    }, []);
    const genUINews = () => {
        return (
            <div className={'grid grid-cols-12 gap-4 lg:gap-2'}>
                {news.length > 0 &&
                    news.map((item, index) =>
                        <NewHomeItem isHome={true} isPrimary={index === 1} key={item.id} item={item}/>)}
            </div>
        )
    }
    return (
        <div className="container mx-auto padding-mobile py-8">
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
                    <TitleSection title="Tin tức nổi bật"/>
                    {/*{news.length > 0 &&*/}
                    {/*    news.map((item) => <NewHomeItem key={item.id} item={item}/>)}*/}
                    {genUINews()}
                    <div className="flex justify-center mt-4">
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
