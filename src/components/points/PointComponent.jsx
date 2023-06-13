import React, {useEffect, useState} from 'react';
import {checkPoint, formatNumberView} from "../../utils/common";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAward} from "@fortawesome/free-solid-svg-icons";
import {awardsConfig} from "../../configs/configs";

function PointComponent({userInfo}) {
  const [awardPresent, setAwardPresent] = useState({})
  useEffect(() => {
    const index = checkPoint(awardsConfig, userInfo.pointCredits)
    if (index > 0) {
      setAwardPresent(awardsConfig[index - 1])
    }
  }, [])
  return (
    <div className={`justify-center flex items-center space-x-2`}>
      <div className={'flex items-center space-x-1 text-sm'}>
        <FontAwesomeIcon icon={faAward} className={'text-primary w-4'}/>
        <span className={'text-primary font-bold'}>{awardPresent.title}</span>
      </div>
      <div className={'h-[4px] w-[4px] rounded-full bg-gray-400'}></div>
      <div className={'flex items-center space-x-1 text-sm'}>
        <span className={'text-[#F96767]'}>{formatNumberView(Math.floor(userInfo.pointCredits))}</span>
        <span className={'text-info font-semibold'}>Points </span>
      </div>
    </div>
  );
}

export default PointComponent;
