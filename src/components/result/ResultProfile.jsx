import React, {useEffect, useState} from 'react';
import {HistoryAPI} from "../../apis/history";

function ResultProfile({userId, isToeic = false}) {
  const [histories, setHistories] = useState([])
  const [point, setPoint] = useState(0)
  const [time, setTime] = useState(0)
  useEffect(() => {
    getHistories()
  }, [userId])

  const getHistories = async () => {
    const res = isToeic ? await HistoryAPI.getStatisticalHistoryByUserId({subject: 9}) : await HistoryAPI.getStatisticalHistoryByUserId()
    setHistories(res.data)
    let tmpP = 0, tmpT = 0
    if (res.data.length) {
      const len = res.data.length
      for (const item of res.data) {
        tmpP = Number(item.point) + tmpP
        tmpT = Number(item.timeSpent) + tmpT
      }
      setTime((tmpT / len))
      setPoint((tmpP / len).toFixed(1))
    }
  }
  const timeSpentConvert = (time) => {
    const m = Math.floor(time / 60)
    const s = Math.round(time % 60)
    return `${m}p${s}s`
  }
  return (
    <div className={"bg-base-100 p-4 !pt-1 rounded-xl mt-4 shadow-md"}>
      <h3 className="text-lg font-bold">
        Kết quả trung bình {isToeic ? ' Toeic' : ''}
      </h3>
      <div className="grid grid-cols-3 md:gap-8 gap-4 mb-4">
        <div className="flex items-center text-primary flex-col border border-primary rounded-lg h-[150px]">
          <div
            className={'text-white bg-primary p-2 uppercase text-sm w-full flex justify-center items-center h-2/5 rounded-tl-md rounded-tr-md'}>
            Số đề thi đã làm
          </div>
          <div className="flex justify-center items-center font-bold text-4xl p-2 flex-1">{histories.length}</div>
        </div>
        <div className="flex items-center text-primary flex-col border border-primary rounded-lg h-[150px]">
          <div
            className={'text-white bg-primary p-2 uppercase text-sm w-full flex justify-center items-center h-2/5 rounded-tl-md rounded-tr-md'}>
            Điểm trung bình
          </div>
          <div className="flex justify-center items-center font-bold text-4xl p-2 flex-1">{point}</div>
        </div>
        <div className="flex items-center text-primary flex-col border border-primary rounded-lg h-[150px]">
          <div
            className={'text-white bg-primary p-2 uppercase text-sm w-full flex justify-center items-center h-2/5 rounded-tl-md rounded-tr-md'}>
            Thời gian trung bình
          </div>
          <div className="flex justify-center items-center font-bold text-4xl p-2 flex-1">{timeSpentConvert(time)}</div>
        </div>
      </div>
      {/*<div className={'text-red-400 text-xl text-center'}>Bạn cần cố gắng thêm nữa!</div>*/}
    </div>
  );
}

export default ResultProfile;
