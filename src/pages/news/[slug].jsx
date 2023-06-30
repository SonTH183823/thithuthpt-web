import {NewAPI} from "apis/new";
import React, {Fragment, useEffect, useState} from "react";
import LatestNew from "@/components/blog/LatestNew";
import {formatDateTime} from "utils/moment";
import {strToSlug} from "../../utils/common";
import {useRouter} from "next/router";
import InteractiveContainer from "@/components/interactive/InteractiveContainer";
import {useSelector} from "react-redux";
import ModalShare from "@/components/modal/ModalShare";
import {typePostConfig} from "../../configs/configs";
import {DocumentAPI} from "../../apis/document";

export async function getServerSideProps({params}) {
  let newData = {};
  try {
    const id = params.slug.toString().split("-").slice(-1);
    newData = await NewAPI.getNewById(id);
  } catch (e) {
    console.log(e);
  }
  return {
    props: {
      newData,
    },
  };
}

const DetailNew = ({newData}) => {
  const [latestNews, setLatestNews] = useState([]);
  const router = useRouter()
  useEffect(() => {
    (async () => {
      try {
        const res = await NewAPI.getNews({perPage: 10});
        if (res) {
          const ftdt = res.data.filter(item => item._id !== newData._id)
          setLatestNews(ftdt);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [router.query]);
  const handleClickCategory = (item) => {
    const slug = strToSlug(item.name);
    router.replace(`/blog/${slug}-${item._id}`);
  };
  const handleShare = () => {
    const modal = document.getElementById("modal-share-id");
    if (modal) {
      modal.click();
    }
  };
  return (
    <Fragment>
      {newData._id ? (
        <div className="container mx-auto py-6 px-4">
          <div className="md:grid grid-cols-12 md:space-x-5">
            <div className="col-span-8">
              <h1 className="my-2 lg:text-4xl text-2xl">{newData.title}</h1>
              <div className="flex space-x-2 items-center select-none">
                <i className="fa-regular fa-clock"></i>
                <span className="text-sm">{formatDateTime(newData.createdAt)}</span>
                <div className={'h-1.5 w-1.5 rounded-full bg-gray-400'}></div>
                <span className="text-sm">{newData.createdBy}</span>
                <div className={'h-1.5 w-1.5 rounded-full bg-gray-400'}></div>
                <div onClick={(e) => handleShare()} className={'flex items-center text-sm cursor-pointer hover:text-primary'}>
                  <span>Chia sẻ</span>
                  <div className=" h-[25px] w-[25px] flex items-center justify-center">
                    <i className="fa-regular fa-share text-xs"></i>
                  </div>
                </div>

              </div>
              <div
                dangerouslySetInnerHTML={{__html: newData.content}}
                className={"my-4"}
              />
              <div className={'flex space-x-3 text-sm items-center'}>
                <div className={'font-bold text-base'}>Danh mục</div>
                {newData.category.map((i) => (
                  <div className={'px-3 py-2 bg-primary rounded-md text-white cursor-pointer hover:opacity-80'}
                       onClick={() => handleClickCategory(i)}>{i.name}</div>))}
              </div>
              <div className="divider"></div>
              <div className={"bg-base-100 rounded-xl mt-4"}>
                <InteractiveContainer postId={newData._id} title={newData.title} typePost={typePostConfig.NEWS}/>
              </div>
            </div>
            <div className="col-span-4">
              <div className="block mt-3">
                <div className="font-bold pb-2 text-lg">Tin mới nhất</div>
                <div className="flex flex-col space-y-3">
                  {latestNews.map((item) => (
                    <LatestNew key={item._id} item={item}/>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <ModalShare id="modal-share-news" title={newData.title}/>
        </div>
      ) : null}
    </Fragment>
  );
};

export default DetailNew;
