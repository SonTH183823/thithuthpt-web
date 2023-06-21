import React, {Fragment, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {
  subjectArrConfig,
  xapSepConfig
} from "../../configs/configs";
import ItemSelect from "@/components/filter/ItemSelect";
import Select from "react-select";
import DocSekeleton from "@/components/Sekeleton/DocSekeleton";
import ButtonSeeMore from "@/components/button/ButtonSeeMore";
import PrimaryDocItem from "@/components/documents/PrimaryDocItem";
import {DocumentAPI} from "../../apis/document";
import {Tooltip as ReactTooltip} from "react-tooltip";

const subjectList = [
  {
    value: null,
    label: 'Tất cả'
  },
  ...subjectArrConfig
]

function Documents() {
  const router = useRouter();
  const [exams, setExams] = useState([]);
  const [total, setTotal] = useState(null);
  const [showButtonLoadMore, setShowButtonLoadMore] = useState(null);
  const [perPage, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [subject, setSubject] = useState(null);
  const [listCategory, setListCategory] = useState([]);
  const [category, setCategory] = useState(null);
  const [sort, setSort] = useState(xapSepConfig[0]);


  const getDocs = async (p) => {
    try {
      setLoading(true);
      const res = await DocumentAPI.filterDocument({
        ...router.query,
        page: p,
        perPage,
        active: 1,
      });
      if (res) {
        if (p === 1) {
          setPage(1)
          setTotal(res.total);
          setExams([...res.data]);
        } else {
          setExams((exams) => [...exams, ...res.data]);
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
    if (subject) {
      let filterParams = {};
      if ("subject" in router.query) {
        delete router.query.subject;
      }
      filterParams.subject = subject;
      if ("outstanding" in router.query) {
        filterParams.outstanding = 1
      }
      if ("category" in router.query) {
        filterParams.category = router.query.category
      }
      const q = Object.fromEntries(
        Object.entries(filterParams).filter(([_, v]) => v)
      );
      let queryTemp = [];
      for (const key in q) {
        queryTemp.push(`${key}=${q[key]}`);
      }
      router.push(`/documents?${queryTemp.join("&")}`);
    } else {
      router.push(`/documents`);
    }
  }, [subject])

  useEffect(() => {
    if (subject) {
      let filterParams = {};
      if ("category" in router.query) {
        delete router.query.category;
      }
      filterParams.category = category;
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
      router.push(`/documents?${queryTemp.join("&")}`);
    } else {
      router.push(`/documents`);
    }
  }, [category])

  useEffect(() => {
    const getPartSubject = async () => {
      if (subject) {
        setLoading(true)
        try {
          const res = await DocumentAPI.getPartSubject({subject})
          if (res.data) {
            const tmp = [
              {
                name: 'Tất cả',
                _id: null
              },
              ...res.data
            ]
            setListCategory(tmp)
            setLoading(false)
            setCategory(null)
          }
        } catch (e) {
          console.log(e)
          setLoading(false)
          setListCategory([])
          setCategory(null)
        }
      } else {
        setListCategory([])
        setCategory(null)
      }
    }
    (async () => {
      await getPartSubject();
    })();
  }, [subject])

  useEffect(() => {
    (async () => {
      await getDocs(1);
    })();
    if (Object.keys(router.query).length) {
      if (router.query?.subject) setSubject(+router.query.subject)
    }
  }, [router.query]);

  useEffect(() => {
    if (sort.value === xapSepConfig[1].value) {
      let queryTemp = [];
      for (const key in router.query) {
        queryTemp.push(`${key}=${router.query[key]}`);
      }
      router.push(`/documents?${queryTemp.join("&")}&outstanding=1`);
    } else {
      if ("outstanding" in router.query) {
        delete router.query.outstanding;
      }
      let queryTemp = [];
      for (const key in router.query) {
        queryTemp.push(`${key}=${router.query[key]}`);
      }
      router.push(`/documents?${queryTemp.join("&")}`);
    }
  }, [sort.value]);

  useEffect(() => {
    if (total && total > 0 && exams.length < total) {
      setShowButtonLoadMore(true);
    } else {
      setShowButtonLoadMore(false);
    }
  }, [exams.length]);

  const handleLoadMore = async () => {
    setLoadMore(true);
    const p = page
    setPage(p + 1);
    await getDocs(p + 1);
    setLoadMore(false);
  };
  const genCate = () => {
    if (listCategory.length) {
      return (
        <div className={'bg-white shadow-xl p-3 rounded-lg mt-4'}>
          <div className={'font-semibold'}>Chuyên đề</div>
          {listCategory.map(item =>
            <ItemSelect
              checked={category === item._id}
              label={item.name}
              handleSelect={() => {
                setCategory(item._id)
              }}/>)
          }
        </div>
      )
    }
    return null
  }
  return (
    <div className={'relative bg-base-200'}>
      <div className=" container mx-auto">
        <div className={'grid lg:grid-cols-12 grid-col-1 gap-1.5 md:gap-3 py-3'}>
          <div className={'hidden lg:block h-fit col-span-3'}>
            <div className={'bg-white shadow-xl p-3 rounded-lg'}>
              <div className={'font-semibold'}>Môn học</div>
              {subjectList.map(item =>
                <ItemSelect
                  checked={subject === item.value}
                  label={item.label}
                  handleSelect={() => {
                    setSubject(item.value)
                  }}/>
              )}
            </div>
            {genCate()}
          </div>
          <div className={'lg:col-span-9 col-span-1 w-full'}>
            <div
              className={'space-x-2 shadow-xl mx-3 sm:w-[97%] w-[93%] lg:hidden flex justify-start bg-white px-3 py-3 rounded-md items-center text-sm md:text-base mb-4 flex-wrap overflow-x-auto'}>
              <div className={'font-semibold'}>Môn học</div>
              {subjectList.map(item =>
                <ItemSelect
                  checked={subject === item.value}
                  label={item.label}
                  mobile={true}
                  hasIcon={false}
                  handleSelect={() => {
                    setSubject(item.value)
                  }}/>
              )}
            </div>
            {listCategory.length ? <div
              className={'space-x-2 shadow-xl mx-3 sm:w-[97%] w-[93%] lg:hidden flex justify-start bg-white px-3 py-3 rounded-md items-center text-sm md:text-base mb-4 flex-wrap overflow-x-auto'}>
              <div className={'font-semibold'}>Chuyên đề</div>
              {listCategory.map(item =>
                <ItemSelect
                  checked={category === item._id}
                  label={item.name}
                  mobile={true}
                  hasIcon={false}
                  handleSelect={() => {
                    setCategory(item._id)
                  }}/>
              )}
            </div> : null}
            <div
              className={'shadow-xl mx-3 flex justify-between bg-white px-3 rounded-md items-center text-sm md:text-base'}>
              <div>Tìm thấy <span className={'font-bold'}>{total}</span> kết quả</div>
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
                <div className="my-4 flex flex-col mx-3">
                  {loading ? (
                    <Fragment>
                      <DocSekeleton/>
                      <DocSekeleton/>
                      <DocSekeleton/>
                      <DocSekeleton/>
                    </Fragment>
                  ) : (
                    <Fragment>
                      {exams.map((doc) => (
                        <PrimaryDocItem key={doc._id} item={doc}/>
                      ))}

                      {loadMore && (
                        <Fragment>
                          <DocSekeleton/>
                          <DocSekeleton/>
                        </Fragment>
                      )}
                    </Fragment>
                  )}
                </div>
                <div className="text-center pb-4">
                  {!loading && (
                    <span className="text-gray-500">Đang hiển thị {exams.length} / {total || 69} kết quả.</span>)}
                </div>

                {showButtonLoadMore ? <div className="flex justify-center pb-8">
                  <ButtonSeeMore handleClick={handleLoadMore}/>
                </div> : null}
              </Fragment>
            ) : (
              <div className="p-16 text-center font-bold">
                Không tìm thấy kết quả!
              </div>
            )}
          </div>
        </div>
      </div>
      <ReactTooltip id={'my-tooltip'}/>
    </div>
  );
};

export default Documents;
