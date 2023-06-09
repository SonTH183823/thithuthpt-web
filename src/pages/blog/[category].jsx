import React, {useEffect, useState} from "react";
import NewCategorySection from "@/components/blog/NewCategorySection";
import {NewAPI} from "apis/new";
import NewHomeItem from "@/components/home/news/NewHomeItem";
import {strToSlug} from "utils/common";
import {useRouter} from "next/router";
import BannerSection from "@/components/blog/BannerSection";
import NewSekeleton from "@/components/Sekeleton/NewSekeleton";

const PostByCategory = () => {
  const [newsByCategory, setNewsByCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const [showLoadMore, setShowLoadMore] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [categoryId, setCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const categoriesRes = await NewAPI.getAllCategories({
          page: 1,
          perPage: limit,
        });
        if (categoriesRes.data) {
          setCategories(categoriesRes.data);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const getNews = async ({cateId, page}) => {
    try {
      setLoading(true)
      const res = await NewAPI.getNews({
        active: 1,
        page,
        perPage: limit,
        category: cateId,
      });
      if (res.data) {
        if (page === 1) {
          setNewsByCategory((news) => [...res.data]);
        } else {
          setNewsByCategory((news) => [...news, ...res.data]);

        }
        setPage(page + 1);
        if (res.data.length + newsByCategory.length < res.total) {
          setShowLoadMore(true);
        } else {
          setShowLoadMore(false);
        }
      }
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      if (router.asPath) {
        const id = router.asPath.split("-").slice(-1);
        if (id && id.length) {
          setCategoryId(id[0]);
          await getNews({cateId: id[0], page: 1});
        }
      }
    })();
  }, [router.asPath]);

  const handleClickCategory = (item) => {
    const slug = strToSlug(item.name);
    router.replace(`/blog/${slug}-${item._id}`);
  };

  const handleLoadMore = async () => {
    await getNews({cateId: categoryId, page});
  };
  return (
    <div>
      <BannerSection/>
      <div className="lg:block hidden">
        <NewCategorySection categories={categories} idActive={categoryId}/>
      </div>
      <div className="container mx-auto px-4">
        <div>
          <div className="md:grid grid-cols-3 md:space-x-8 my-8">
            <div className="col-span-2">
              {newsByCategory?.length > 0 ?
                newsByCategory.map((item, index) => (
                  <NewHomeItem key={index} item={item}/>
                )) : <div className={'text-center pt-3'}>Không có tin tức nào 😥</div>}
              {loading && <>
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
              <div></div>
            </div>
            <div>
              <div>
                <div className="font-bold text-xl">Danh mục tin tức</div>
                <div className="h-[2px] bg-gray-100 mt-1.5 relative">
                  <div className="h-1 bg-primary absolute -top-1 left-0 w-[80px]"></div>
                </div>
              </div>
              <div className="flex flex-col space-y-2.5 my-2.5">
                {categories.map((item, index) => {
                  if (item._id !== categoryId) {
                    return (
                      <div
                        key={index}
                        className={"space-x-2 cursor-pointer hover:text-primary hover:underline"}
                        onClick={() => handleClickCategory(item)}
                      >
                        <i className="fa-regular fa-chevron-right text-xs"></i>
                        <span>{item.name}</span>
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostByCategory;
