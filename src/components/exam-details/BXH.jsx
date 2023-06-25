import React, {useEffect, useState} from 'react';
import Avatar from "@/components/user/Avatar";
import gold from "@/assets/images/bxh/gold.png"
import silver from "@/assets/images/bxh/silver.png"
import bronze from "@/assets/images/bxh/bronze.png"
import Image from "next/image";
import {HistoryAPI} from "../../apis/history";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {strToSlug} from "../../utils/common";
import {useRouter} from "next/router";

function BXH({idExam}) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const res = await HistoryAPI.getBXHByExamId(idExam)
        if (res && res.data) {
          setData(res.data)
        }
        setLoading(false)
      } catch (e) {
        console.log(e)
        setLoading(false)
      }
    })()
  }, [idExam])

  const timeSpentConvert = (time) => {
    const m = Math.floor(time / 60)
    const s = time % 60
    return `${m}p ${s}s`
  }
  const genCup = (index) => {
    if (index === 1) return <Image src={gold} alt={''} className={'absolute w-3 h-3 left-[-10px]'}/>
    if (index === 2) return <Image src={silver} alt={''} className={'absolute w-3 h-3 left-[-10px]'}/>
    if (index === 3) return <Image src={bronze} alt={''} className={'absolute w-3 h-3 left-[-10px]'}/>
    return <></>
  }
  const navigateToProfile = (user) => {
    router.push(`/profile/${strToSlug(user.name)}-${user._id}`)
  }
  return (
    <>
      <h3 className="text-lg font-bold !my-2">
        Bảng xếp hạng
      </h3>
      <div className="grid grid-cols-12 gap-2 font-bold">
        <div className="py-2 px-4 col-span-7 ">Tên</div>
        <div className="py-2 col-span-2 text-center">Điểm</div>
        <div className="py-2 col-span-3 text-center">Thời gian</div>
      </div>
      {
        loading ? <div className={'text-center flex items-center space-x-2 justify-center'}>
          <FontAwesomeIcon icon={faSpinner} spin={true} className={'w-5'}/>
          <span>Đang tải...</span>
        </div> : <>
          {
            data.length === 0 ? <div className={'text-center py-4'}>Không có dữ liệu</div> :
              <>
                {
                  data.map((item, index) => (
                    <div className="grid grid-cols-12 gap-2 !text-sm" key={'bXH' + index}>
                      <div className=" py-2 px-2 col-span-7 flex items-center relative cursor-pointer">
                        <Avatar sizeAvatar={'small'} className={'w-8 h-8'} avatar={item.userId.avatar}
                                onClickAva={() => navigateToProfile(item.userId)}/>
                        {genCup(index + 1)}
                        <span
                          className={'ml-2 line-clamp-1 font-semibold hover:text-primary hover:underline'}
                          onClick={() => navigateToProfile(item.userId)}>{item.userId.name}</span>
                      </div>
                      <div className=" py-2 col-span-2 text-center items-center flex justify-center">{item.point}</div>
                      <div
                        className=" py-2 col-span-3 text-center items-center flex justify-center">{timeSpentConvert(item.timeSpent)}</div>
                    </div>
                  ))
                }
              </>
          }

        </>
      }

    </>
  );
}

export default BXH;
