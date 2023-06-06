import React, {Fragment, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {xapSepConfig} from "../../configs/configs";
import {ExamAPI} from "../../apis/exam";
import ItemSelect from "@/components/filter/ItemSelect";
import Select from "react-select";
import ButtonSeeMore from "@/components/button/ButtonSeeMore";
import PostSekeleton from "@/components/Sekeleton/PostSekeleton";
import HomeExamItem from "@/components/exam/HomeExamItem";

const typeCateList = [
  {
    value: null,
    label: 'Tất cả'
  },
  {
    value: 1,
    label: 'Bộ đề thi'
  },
  {
    value: 2,
    label: 'Đề rút gọn'
  },
]

function Toeic(props) {
  const router = useRouter();
  const [exams, setExams] = useState([1, 2, 3, 4, 5, 6]);
  const [total, setTotal] = useState(null);
  const [showButtonLoadMore, setShowButtonLoadMore] = useState(null);
  const [limit, setLimit] = useState(6);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [typeCate, setTypeCate] = useState(null);
  const [sort, setSort] = useState(xapSepConfig[0]);
  const [rate, setRate] = useState(null);
  const getToeic = async (offsetProp) => {
    try {
      setLoading(true);
      const res = await ExamAPI.filterExam({
        ...router.query,
        offset: offsetProp,
        limit,
        active: 1,
      });
      if (res) {
        if (offsetProp === 0) {
          setTotal(res.total);
          setExams([...res.exams]);
        } else {
          setExams((exams) => [...exams, ...res.exams]);
        }
      } else {
        setExams([]);
        setTotal(0);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    let filterParams = {};
    if (typeCate) {
      if ("typeCate" in router.query) {
        delete router.query.typeCate;
      }
      filterParams.typeCate = typeCate;
    }
    if ("rate" in router.query) {
      delete router.query.rate;
    }
    filterParams.rate = rate;
    if ("outstanding" in router.query) {
      filterParams.outstanding = 1
    }
    const q = Object.fromEntries(
      Object.entries(filterParams).filter(([_, v]) => v)
    );
    let queryTemp = [];
    for (const key in q) {
      queryTemp.push(`${key}=${q[key]}`);
    }
    router.push(`/toeic?${queryTemp.join("&")}`);
  }, [typeCate])

  useEffect(() => {
    let filterParams = {};
    if (rate) {
      if ("rate" in router.query) {
        delete router.query.rate;
      }
      filterParams.rate = rate;
    }
    if ("typeCate" in router.query) {
      delete router.query.typeCate;
    }
    filterParams.typeCate = typeCate;
    if ("outstanding" in router.query) {
      filterParams.outstanding = 1
    }
    const q = Object.fromEntries(
      Object.entries(filterParams).filter(([_, v]) => v)
    );
    let queryTemp = [];
    for (const key in q) {
      queryTemp.push(`${key}=${q[key]}`);
    }
    router.push(`/toeic?${queryTemp.join("&")}`);
  }, [rate])

  useEffect(() => {
    (async () => {
      await getToeic(0);
    })();
    if (Object.keys(router.query).length) {
      if (router.query?.typeCate) setTypeCate(+router.query.typeCate)
    }
  }, [router.query]);

  useEffect(() => {
    if (sort.value === xapSepConfig[1].value) {
      let queryTemp = [];
      for (const key in router.query) {
        queryTemp.push(`${key}=${router.query[key]}`);
      }
      router.push(`/toeic?${queryTemp.join("&")}&outstanding=1`);
    } else {
      if ("outstanding" in router.query) {
        delete router.query.outstanding;
      }
      let queryTemp = [];
      for (const key in router.query) {
        queryTemp.push(`${key}=${router.query[key]}`);
      }
      router.push(`/toeic?${queryTemp.join("&")}`);
    }
  }, [sort.value]);

  useEffect(() => {
    if (total && total > 0 && exams.length < total) {
      setShowButtonLoadMore(true);
    } else {
      setShowButtonLoadMore(false);
    }
  }, [exams.length]);

  const handleLoadMore = () => {
    setLoadMore(true);
    getToeic(offset + limit);
    setOffset(offset + limit);
    setLoadMore(false);
  };
  return (
    <div className={'relative bg-base-200'}>
      <div className=" container mx-auto">
        <div className={'grid lg:grid-cols-12 grid-col-1 gap-1.5 md:gap-3 py-3'}>
          <div className={'hidden lg:block h-fit col-span-3'}>
            <div className={'bg-white shadow-xl p-3 rounded-lg'}>
              <div className={'font-semibold'}>Phân loại</div>
              {typeCateList.map(item =>
                <ItemSelect
                  checked={typeCate === item.value}
                  label={item.label}
                  handleSelect={() => {
                    setTypeCate(item.value)
                  }}/>
              )}
            </div>
            <div className={'bg-white shadow-xl p-3 rounded-lg mt-4'}>
              <div className={'font-semibold'}>Đánh giá</div>
              <ItemSelect checked={rate === null} label={'Tất cả'} hasIcon={true} handleSelect={() => {
                setRate(null)
              }}/>
              <ItemSelect checked={rate === 5} label={'⭐⭐⭐⭐⭐'} hasIcon={true} handleSelect={() => {
                setRate(5)
              }}/>
              <ItemSelect checked={rate === 4} label={'⭐⭐⭐⭐'} hasIcon={true} handleSelect={() => {
                setRate(4)
              }}/>
              <ItemSelect checked={rate === 3} label={'⭐⭐⭐'} hasIcon={true} handleSelect={() => {
                setRate(3)
              }}/>
              <ItemSelect checked={rate === 2} label={'⭐⭐'} hasIcon={true} handleSelect={() => {
                setRate(2)
              }}/>
              <ItemSelect checked={rate === 1} label={'⭐'} hasIcon={true} handleSelect={() => {
                setRate(1)
              }}/>
            </div>
          </div>
          <div className={'lg:col-span-9 col-span-1 w-full'}>
            <div
              className={'space-x-2 shadow-xl mx-3 sm:w-[97%] w-[93%] lg:hidden flex justify-start bg-white px-3 py-3 rounded-md items-center text-sm md:text-base mb-4 flex-wrap overflow-x-auto'}>
              <div className={'font-semibold'}>Phân loại</div>
              {typeCateList.map(item =>
                <ItemSelect
                  checked={typeCate === item.value}
                  label={item.label}
                  mobile={true}
                  hasIcon={false}
                  handleSelect={() => {
                    setTypeCate(item.value)
                  }}/>
              )}
            </div>
            <div
              className={'space-x-2 shadow-xl mx-3 sm:w-[97%] w-[93%] lg:hidden flex justify-start bg-white px-3 py-3 rounded-md items-center text-sm md:text-base mb-4 flex-wrap overflow-x-auto'}>
              <div className={'font-semibold'}>Đánh giá</div>
              <ItemSelect checked={rate === null} label={'Tất cả'} hasIcon={true} handleSelect={() => {
                setRate(null)
              }}/>
              <ItemSelect checked={rate === 5} label={'5⭐'} hasIcon={true} handleSelect={() => {
                setRate(5)
              }}/>
              <ItemSelect checked={rate === 4} label={'4⭐'} hasIcon={true} handleSelect={() => {
                setRate(4)
              }}/>
              <ItemSelect checked={rate === 3} label={'3⭐'} hasIcon={true} handleSelect={() => {
                setRate(3)
              }}/>
              <ItemSelect checked={rate === 2} label={'2⭐'} hasIcon={true} handleSelect={() => {
                setRate(2)
              }}/>
              <ItemSelect checked={rate === 1} label={'1⭐'} hasIcon={true} handleSelect={() => {
                setRate(1)
              }}/>
            </div>
            <div
              className={'shadow-xl mx-3 flex justify-between bg-white px-3 rounded-md items-center text-sm md:text-base'}>
              <div>Tìm thấy <span className={'font-bold'}>69</span> kết quả</div>
              <div className={'flex items-center space-x-2'}>
                <div className={'font-semibold'}>Sắp xếp</div>
                <Select
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderRadius: "5px",
                      borderColor: "#e5e7eb",
                      margin: "8px 0",
                      width: "130px",
                    }),
                  }}
                  options={xapSepConfig}
                  onChange={(option) => {
                    setSort(option)
                  }}
                  value={sort}
                />
              </div>
            </div>
            {exams.length > 0 ? (
              <Fragment>
                <div className="my-4 grid md:grid-cols-2 grid-col-1 gap-1 md:gap-3">
                  {loading ? (
                    <Fragment>
                      <PostSekeleton isSearch={true}/>
                      <PostSekeleton isSearch={true}/>
                      <PostSekeleton isSearch={true}/>
                      <PostSekeleton isSearch={true}/>
                    </Fragment>
                  ) : (
                    <Fragment>
                      {exams.map((post) => (
                        <HomeExamItem key={post.id} item={post} isSearch={true}/>
                      ))}

                      {!loadMore && (
                        <Fragment>
                          <PostSekeleton isSearch={true}/>
                          <PostSekeleton isSearch={true}/>
                        </Fragment>
                      )}
                    </Fragment>
                  )}
                </div>
                <div className="text-center pb-4">
                  {!loading && (
                    <span className="text-gray-500">Đang hiển thị {exams.length} / {total || 69} kết quả.</span>)}
                </div>

                {showButtonLoadMore && <div className="flex justify-center pb-8">
                  <ButtonSeeMore handleClick={handleLoadMore}/>
                </div>}
              </Fragment>
            ) : (
              <div className="p-16 text-center font-bold">
                Không tìm thấy kết quả!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toeic;
