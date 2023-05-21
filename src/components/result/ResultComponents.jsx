import React from 'react';
import StarRating from "@/components/feedback/StarRating";
import ButtonPrimary from "@/components/button/ButtonPrimary";

function ResultComponents(props) {
  return (
    <div className={"bg-base-100 p-4 !pt-1 rounded-xl mt-4"}>
      <h3 className="text-lg font-bold">
        Kết quả
      </h3>
      <div className="grid grid-cols-3 md:gap-8 gap-4 mb-4">
        <div className={'col-span-1 bg-primary text-white flex flex-col justify-center items-center w-full px-2 md:px-8 py-8 rounded-2xl'}>
          <div className={'font-light text-sm md:text-base'}>Số câu đúng</div>
          <div className={'text-2xl md:text-4xl font-bold'}>4/50</div>
        </div>
        <div className={'col-span-1 bg-primary text-white flex flex-col justify-center items-center w-full px-2 md:px-8 py-8 rounded-2xl'}>
              <div className={'font-light text-sm md:text-base'}>Điểm số</div>
              <div className={'text-2xl md:text-4xl font-bold'}>9.69</div>
        </div>
        <div className={' col-span-1 bg-primary text-white flex flex-col justify-center items-center w-full px-2 md:px-8 py-8 rounded-2xl'}>
              <div className={'font-light text-sm md:text-base'}>Thời gian làm</div>
          <div className={'text-2xl md:text-4xl font-bold'}>6:96</div>
        </div>
      </div>
      <div className={'text-red-400 text-xl text-center'}>Bạn cần cố gắng thêm nữa!</div>
    </div>
  );
}

export default ResultComponents;