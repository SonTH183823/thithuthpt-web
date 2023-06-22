import React, {Fragment, useEffect, useState} from "react";
import PrimayNewItem from "@/components/new/PrimayNewItem";
import NewCategorySection from "@/components/blog/NewCategorySection";
import NewHomeItem from "@/components/home/news/NewHomeItem";
import {strToSlug} from "utils/common";
import {useRouter} from "next/router";
// import { bannerAPI } from "apis/banner";
import BannerSection from "@/components/blog/BannerSection";
import {NewAPI} from "../../apis/new";
import NewSekeleton from "@/components/Sekeleton/NewSekeleton";

const Blog = () => {
  const [newOutstandings, setNewOutstandings] = useState([]);
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(2);
  const getNews = async (page) => {
    if (page === 1) {
      setLoading(true)
    } else {
      setShowLoadMore(true)
    }
    try {
      const newsRes = await NewAPI.getNews({
        active: 1,
        perPage: 5,
        page
      });
      if (newsRes && newsRes?.data) {
        setNews((news) => [...news, ...newsRes.data]);
        setPage(page + 1);

        if (newsRes.data.length + news.length < newsRes.total - 5) {
          setShowLoadMore(true);
        } else {
          setShowLoadMore(false);
        }
        setLoading(false)
        setLoadingMore(false)
      }
    } catch (e) {
      console.log(e);
      setLoading(false)
      setLoadingMore(false)
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const categoriesRes = await NewAPI.getAllCategories();
        if (categoriesRes.data) {
          setCategories([...categoriesRes.data]);
        }
        await getNews(2);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const res = await NewAPI.getNews({
          active: 1,
          page: 1,
          perPage: 5
        });
        if (res && res?.data) {
          setNewOutstandings(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [router]);

  const handleClickCategory = (item) => {
    const slug = strToSlug(item.name);
    router.replace(`/blog/${slug}-${item._id}`);
  };

  const handleLoadMore = async () => {
    await getNews(page);
  };

  const ListNews = () => {
    if (loading) {
      return <>
        <NewSekeleton/>
        <NewSekeleton/>
        <NewSekeleton/>
      </>
    } else {
      return <>
        {news?.length ?
          news.map((item) => <NewHomeItem key={item._id} item={item}/>) :
          <div className={'text-center mt-4'}>Không có tin tức mới!</div>}
        {loadingMore && <>
          <NewSekeleton/>
          <NewSekeleton/>
        </>}
        {showLoadMore && (
          <div className="flex justify-center pb-4">
            <div
              className=" btn bg-primary w-[200px] text-white normal-case hover:bg-primary hover:outline-none hover:border-primary outline-none"
              onClick={handleLoadMore}
            >
              Xem thêm
            </div>
          </div>
        )}
      </>
    }
  }

  return (
    <div>
      <BannerSection/>
      <div className="lg:block hidden">
        <NewCategorySection categories={categories}/>
      </div>
      <div className="container mx-auto py-4">
        <div>
          {newOutstandings?.length > 0 && (
            <Fragment>
              <div className="lg:grid grid-cols-2 lg:space-x-2 px-2">
                <PrimayNewItem primary={true} item={newOutstandings[0]}/>
                <div className="grid grid-cols-2 grid-rows-2 gap-2 my-2">
                  {newOutstandings.slice(1).map((item) => (
                    <PrimayNewItem key={item._id} item={item}/>
                  ))}
                </div>
              </div>
            </Fragment>
          )}
          <div className="md:grid grid-cols-3 md:space-x-8 my-4 px-4">
            <div className="col-span-2">
              <div className="md:mb-0 mb-4">
                <div className="font-bold text-xl">Bài viết mới</div>
                <div className="h-[2px] bg-gray-100 mt-1.5 relative">
                  <div className="h-1 bg-primary absolute -top-1 left-0 w-[80px]"></div>
                </div>
              </div>
              <ListNews/>
            </div>
            <div>
              <div>
                <div className="font-bold text-xl">Danh mục tin tức</div>
                <div className="h-[2px] bg-gray-100 mt-1.5 relative">
                  <div className="h-1 bg-primary absolute -top-1 left-0 w-[80px]"></div>
                </div>
              </div>
              <div className="flex flex-col space-y-2.5 my-2.5">
                {categories.map((item, index) => (
                  <div
                    key={item._id}
                    className={"space-x-2 cursor-pointer hover:text-primary hover:underline"}
                    onClick={() => handleClickCategory(item)}
                  >
                    <i className="fa-regular fa-chevron-right text-xs"></i>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
