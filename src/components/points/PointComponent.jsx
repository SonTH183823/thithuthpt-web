import React from 'react';
import {formatNumberView} from "../../utils/common";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAward} from "@fortawesome/free-solid-svg-icons";

function PointComponent(props) {
  const userInfo = {
    userTitle: 'Tân binh',
    pointCredits: 234
  }
  return (
    <div className={`justify-center flex items-center space-x-2`}>
      <div className={'flex items-center space-x-1 text-sm'}>
        <FontAwesomeIcon icon={faAward} className={'text-primary w-4'}/>
        <span className={'text-primary font-bold'}>{userInfo.userTitle}</span>
      </div>
      <div className={'h-[4px] w-[4px] rounded-full bg-gray-400'}></div>
      <div className={'flex items-center space-x-1 text-sm'}>
                 <span
                   className={'text-[#F96767]'}>{formatNumberView(Math.floor(userInfo.pointCredits))}</span>
        <span className={'text-info'}>Points </span>
      </div>
    </div>
  );
}

export default PointComponent;
