import React from 'react';

function ResultProfile(props) {
  return (
    <div className={"bg-base-100 p-4 !pt-1 rounded-xl mt-4 shadow-md"}>
      <h3 className="text-lg font-bold">
        Kết quả
      </h3>
      <div className="grid grid-cols-3 md:gap-8 gap-4 mb-4">
        <div className="flex items-center text-primary flex-col border border-primary rounded-lg h-[150px]">
          <div
            className={'text-white bg-primary p-2 uppercase text-sm w-full flex justify-center items-center h-2/5 rounded-tl-md rounded-tr-md'}>
            Số đề thi đã làm
          </div>
          <div className="flex justify-center items-center font-bold text-4xl p-2 flex-1">69</div>
        </div>
        <div className="flex items-center text-primary flex-col border border-primary rounded-lg h-[150px]">
          <div
            className={'text-white bg-primary p-2 uppercase text-sm w-full flex justify-center items-center h-2/5 rounded-tl-md rounded-tr-md'}>
            Điểm trung bình
          </div>
          <div className="flex justify-center items-center font-bold text-4xl p-2 flex-1">9.6</div>
        </div>
        <div className="flex items-center text-primary flex-col border border-primary rounded-lg h-[150px]">
          <div
            className={'text-white bg-primary p-2 uppercase text-sm w-full flex justify-center items-center h-2/5 rounded-tl-md rounded-tr-md'}>
            Thời gian trung bình
          </div>
          <div className="flex justify-center items-center font-bold text-4xl p-2 flex-1">9.6</div>
        </div>
      </div>
      {/*<div className={'text-red-400 text-xl text-center'}>Bạn cần cố gắng thêm nữa!</div>*/}
    </div>
  );
}

export default ResultProfile;
