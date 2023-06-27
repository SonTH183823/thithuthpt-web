import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAward} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
// import {membersAPI} from "@apis";
import awardIcon from "../../assets/images/award/badge_full.png"
import {awardsConfig} from "../../configs/configs";
import {checkPoint} from "../../utils/common";

const Award = ({userInfo}) => {
  const [nextAward, setNextAward] = useState({})
  const [awardPresent, setAwardPresent] = useState({})
  const [indexAward, setIndexAward] = useState(-1)
  const [progressBar, setProgressBar] = useState(0)
  const [isShowLevel, setIsShowLevel] = useState(null)


  useEffect(() => {
    (async () => {
      try {
        const index = checkPoint(awardsConfig, userInfo.pointCredits)
        setAwardPresent(awardsConfig[index - 1])
        setIndexAward(index)
        setNextAward(awardsConfig[index])
        if (index < awardsConfig.length - 1) {
          setProgressBar((Math.floor(userInfo.pointCredits) / (awardsConfig[index]).minimumLevel) * 100)
          setIsShowLevel(true)
        } else if (index === awardsConfig.length - 1) {
          if (+userInfo.pointCredits > awardsConfig[index].minimumLevel) {
            setProgressBar(100)
            setIsShowLevel(false)
          } else {
            setIsShowLevel(true)
            setProgressBar((Math.floor(userInfo.pointCredits) / (awardsConfig[index]).minimumLevel) * 100)
          }
        }
      } catch (e) {
        console.log(e)
      }
    })()
  }, [userInfo])

  const getLeft = () => {
    if (progressBar >= 100) {
      return `calc(${progressBar}% - 80px)`
    } else if (progressBar <= 2) {
      return `calc(${progressBar}%)`
    } else if (progressBar <= 10) {
      return `calc(${progressBar}% - 10px)`
    } else if (progressBar > 10 && progressBar <= 20) {
      return `calc(${progressBar}% - 40px)`
    } else if (progressBar > 20 && progressBar <= 40) {
      return `calc(${progressBar}% - 50px)`
    } else if (progressBar > 40 && progressBar <= 60) {
      return `calc(${progressBar}% - 80px)`
    } else {
      return `calc(${progressBar}% - 100px)`
    }
  }
  return (
    <div className={'py-4 relative bg-base-100 lg:px-0 px-2 select-none'}>
      <div className={'flex items-center gap-x-5'}>
        <div
          className={'w-[40px] h-[40px] rounded-full bg-[#d1f8ea] flex items-center justify-center border-2 border-primary'}>
          <FontAwesomeIcon icon={faAward} className={'text-primary text-xl w-4'}/>
        </div>
        <div className={'flex-1'}>
          <div className={'text-primary font-bold'}>{awardPresent.title}</div>
          <div className={'flex items-center'}>
            {isShowLevel ? <span className={'text-info'}>Còn <span
                className={'font-bold'}>{nextAward.minimumLevel - Math.floor(userInfo.pointCredits)} Points</span> để đạt cấp độ <span
                className={'font-bold text-primary'}>{nextAward.title}</span></span>
              :
              <span className={'text-info'}>Đã đạt cấp độ cuối cùng.</span>
            }
          </div>
        </div>
      </div>
      <div
        className={`rounded-full w-full border-[3px] border-backgroundPrimary ${isShowLevel ? 'mt-12' : 'mt-4'} flex items-center justify-between overflow-hidden`}>
        <div
          className={'w-[40px] h-[40px] rounded-full bg-[#d1f8ea] flex items-center justify-center border-2 border-primary z-10'}>
          <FontAwesomeIcon icon={faAward} className={'text-primary text-xl w-4'}/>
        </div>
        {
          progressBar === 100 ?

            <div className={'flex-1 leading-[40px] text-end relative'}>
              <div className={`bg-primary h-[40px] -ml-[40px]`}
                   style={{width: `calc(100% + 80px)`}}>
              </div>
            </div>
            :
            <div className={'flex-1 leading-[40px] text-end relative'}>
              <div className={`bg-[#02967D] h-[40px] rounded-tr-full rounded-br-full -ml-[40px]`}
                   style={{width: `calc(${progressBar}%)`}}>
              </div>
            </div>
        }
        <div
          className={'w-[40px] h-[40px] rounded-full bg-[#d1f8ea] flex items-center justify-center border-2 border-primary z-10'}>
          <div className={'relative w-[22px] h-[22px]'}>
            <Image src={awardIcon} layout={'fill'} objectFit={'cover'} className={'opacity-70'} alt={''}/>
          </div>
        </div>
      </div>
      <div className={'absolute bottom-16 z-10 w-fit'}
           style={{left: getLeft()}}>
        <div className="arrowBox arrow-bottom">
        <span
          className={'text-white font-bold text-[12px] text-center'}>{Math.floor(userInfo.pointCredits)}<span
          className={'font-bold text-secondary'}>/{nextAward.minimumLevel}</span></span>
        </div>
      </div>
    </div>
  );
};

export default Award;
