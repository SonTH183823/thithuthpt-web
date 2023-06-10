import React, {Fragment, useEffect, useState} from "react";
// import banner from "@/assets/images/banners/1.png";
import Image from "next/image";
import PrimayNewItem from "@/components/new/PrimayNewItem";
import NewCategorySection from "@/components/blog/NewCategorySection";
// import { NewAPI } from "apis/new";
import NewHomeItem from "@/components/home/news/NewHomeItem";
// import { NewCategoryAPI } from "apis/new-category";
import {strToSlug} from "utils/common";
import {useRouter} from "next/router";
// import { bannerAPI } from "apis/banner";
import BannerSection from "@/components/blog/BannerSection";
import {NewCategoryAPI} from "../../apis/new-category";
import {NewAPI} from "../../apis/new";

const Blog = () => {
  const [newOutstandings, setNewOutstandings] = useState([1, 2, 3, 4, 5]);
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const getNews = async (page) => {
    try {
      const newsRes = await NewAPI.getNews({
        active: 1,
        perPage,
        page
        // isOutstanding: 0,
      });
      if (newsRes && newsRes?.data) {
        setNews((news) => [...news, ...newsRes.data]);
        setPage(page + 1);

        if (newsRes.data.length + news.length < newsRes.total) {
          setShowLoadMore(true);
        } else {
          setShowLoadMore(false);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const categoriesRes = await NewAPI.getAllCategories();
        if (categoriesRes.data) {
          setCategories([...categoriesRes.data]);
        }
        await getNews(1);
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
          perPage,
          isOutstanding: 1,
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
    router.replace(`/blog/${slug}-${item.id}`);
  };

  const handleLoadMore = async () => {
    await getNews(page);
  };

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
              {news?.length > 0 &&
                news.map((item) => <NewHomeItem key={item._id} item={item}/>)}
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
