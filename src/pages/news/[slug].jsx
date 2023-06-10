import {NewAPI} from "apis/new";
import Image from "next/image";
import React, {Fragment, useEffect, useState} from "react";
import LatestNew from "@/components/blog/LatestNew";
import {formatDate} from "utils/moment";
import {strToSlug} from "../../utils/common";
import {useRouter} from "next/router";

export async function getServerSideProps({params}) {
  let newData = {};
  try {
    const id = params.slug.split("-").slice(-1);
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
  const [latestNews, setLatestNews] = useState([1, 2, 3, 4, 5]);
  const router = useRouter()
  useEffect(() => {
    (async () => {
      try {
        const res = await NewAPI.getNews({sort: {createdAt: -1}, perPage: 10});
        if (res) {
          setLatestNews(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  const handleClickCategory = (item) => {
    const slug = strToSlug(item.name);
    router.replace(`/blog/${slug}-${item._id}`);
  };
  return (
    <Fragment>
      {newData._id ? (
        <div className="container mx-auto py-6 px-4">
          <div className="md:grid grid-cols-12 md:space-x-5">
            <div className="col-span-8">
              <h1 className="my-2 lg:text-4xl text-2xl">{newData.title}</h1>
              <div className="flex space-x-1">
                <i className="fa-regular fa-clock"></i>
                <span className="text-sm">{formatDate(newData.createdAt)}</span>
              </div>
              <div
                dangerouslySetInnerHTML={{__html: newData.content}}
                className={"my-4"}
              ></div>
              <div className={'text-center font-semibold my-4'}>- HẾT -</div>
              <div className={'flex space-x-2 text-sm items-center'}>
                {newData.category.map((i) => (
                  <div className={'px-3 py-2 bg-primary rounded-md text-white cursor-pointer hover:opacity-80'}
                       onClick={() => handleClickCategory(i)}>{i.name}</div>))}
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
        </div>
      ) : null}
    </Fragment>
  );
};

export default DetailNew;
