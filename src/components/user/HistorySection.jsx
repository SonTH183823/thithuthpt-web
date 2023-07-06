import React, {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PrimaryPostItem from "../exam/PrimaryExamItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {HistoryAPI} from "../../apis/history";
import Select from "react-select";
import {sortHistoryConfig, subjectArrConfig} from "../../configs/configs";
import ItemSelect from "@/components/filter/ItemSelect";

const subjectList = [
  {
    value: null,
    label: 'Tất cả'
  },
  ...subjectArrConfig
]
const HistorySection = ({userId, isToeic = false}) => {
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [histories, setHistories] = useState([]);
  const [sort, setSort] = useState(sortHistoryConfig[0]);
  const [subject, setSubject] = useState(isToeic ? 9 : null);

  useEffect(() => {
    setTotal(0)
    setPage(1)
    setHistories([])
    getHistoriesStart()
  }, [sort, subject, userId])

  const getHistoriesStart = async () => {
    if (userId) {
      try {
        const data = {
          page: page,
          perPage: limit,
          userId
        }
        if (subject) {
          data.subject = subject
        }
        if (sort.value === 2) {
          data.sort = '0'
        }
        const res = await HistoryAPI.getHistoryByUserId(data);
        if (res.total) {
          setHistories(res.data);
          setTotal(res.total);
          if (res.data.length === res.total) {
            setHasMore(false);
          }
        } else {
          setHasMore(false);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  const getMore = async () => {
    try {
      const data = {
        page: page + 1,
        perPage: limit,
        userId
      }
      if (subject) {
        data.subject = subject
      }
      if (sort.value === 2) {
        data.sort = '0'
      }
      const res = await HistoryAPI.getHistoryByUserId(data);
      setPage(page + 1);
      if (res.data.length) {
        setHistories([...histories, ...res.data]);
      } else {
        setHasMore(false);
      }
    } catch (e) {
      setHasMore(false);
    }
  };
  return (
    <>
      <div
        className={'shadow-md px-3 flex justify-between bg-white rounded-lg items-center text-sm md:text-base mb-4'}>
        <div>Lịch sử làm bài <span className={'font-bold'}>{total}</span> kết quả</div>
        <div className={'flex items-center space-x-2'}>
          <div className={'font-semibold'}>Sắp xếp</div>
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderRadius: "5px",
                borderColor: "#e5e7eb",
                margin: "8px 0",
                width: "170px",
              }),
            }}
            options={sortHistoryConfig}
            onChange={(option) => {
              setSort(option)
            }}
            value={sort}
          />
        </div>
      </div>
      {
        isToeic ? <></> :
          <div
            className={'space-x-2 shadow-xl w-[100%] flex justify-start bg-white px-3 py-3 rounded-md items-center text-sm  mb-4 flex-wrap overflow-x-auto'}>
            <div className={'font-semibold'}>Môn học</div>
            {subjectList.map(item => {
              if (item.value !== 9) {
                return <ItemSelect
                  checked={subject === item.value}
                  label={item.label}
                  mobile={true}
                  hasIcon={false}
                  handleSelect={() => {
                    setSubject(item.value)
                  }}/>
              }
            })
            }
          </div>
      }
      <InfiniteScroll
        dataLength={getMore}
        next={getMore}
        hasMore={hasMore}
        endMessage={
          <div className="text-sm font-normal text-center mt-4">
            Đã tải hết.
          </div>
        }
        loader={
          <div className={'text-center flex items-center space-x-2 justify-center'}>
            <FontAwesomeIcon icon={faSpinner} spin={true} className={'w-5'}/>
            <span>Đang tải...</span>
          </div>}
      >
        {histories.length > 0 &&
          histories.map((item) => <PrimaryPostItem history={item} key={item._id}/>)}
      </InfiniteScroll>
    </>
  );
};

export default React.memo(HistorySection);
