import React, {useEffect, useState} from 'react';
import image from '../../assets/images/toeic/1.webp'
import Image from "next/image";
import CountDown from "@/components/exam-details/CountDown";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import {answerConfig} from "../../configs/configs";
import AudioPlayer from "@/components/audio/AudioPlayer";

function PartComponent({part, setTabActive, listQuestion}) {
  const answers = ['A', 'B', 'C', 'D']
  let oldPosition = null
  const [listQues, setListQues] = useState([...Array(200).fill(0)])
  const [startAndNumber, SetStartAndNumber] = useState([0, 6])
  const structureToeic = {
    PART1: 0,
    PART2: 6,
    PART3: 31,
    PART4: 70,
    PART5: 100,
    PART6: 130,
    PART7: 146
  }
  const startPartIndex = [0, 6, 31, 70, 100, 130, 146]
  useEffect(() => {
    switch (part) {
      case 1: {
        SetStartAndNumber([0, 6])
        break
      }
      case 2: {
        SetStartAndNumber([6, 31])
        break
      }
      case 3: {
        SetStartAndNumber([31, 70])
        break
      }
      case 4: {
        SetStartAndNumber([70, 100])
        break
      }
      case 5: {
        SetStartAndNumber([100, 130])
        break
      }
      case 6: {
        SetStartAndNumber([130, 146])
        break
      }
      case 7: {
        SetStartAndNumber([146, 200])
        break
      }
    }
  }, [part])
  const questionClick = (index) => {
    if (index !== oldPosition) {
      oldPosition = index
      const divE = document.getElementById('question-' + index)
      const rect = divE.getBoundingClientRect();
      let top = rect.top + window.pageYOffset - 80;
      let left = rect.left + window.pageXOffset;
      window.scrollTo({top: top, left: left, behavior: 'smooth'});
    }
  }
  const handleAnsQues = (index, ans) => {
    if (listQues[index] === answerConfig[ans].value) {
      setListQues(l => {
        let newA = [...l]
        newA[index] = 0
        return newA
      })
    } else {
      setListQues(l => {
        let newA = [...l]
        newA[index] = answerConfig[ans].value
        return newA
      })
    }
  }
  const finishExam = () => {
    const modal = document.getElementById("modal-confirm-finish-exam-id");
    if (modal) {
      modal.click();
    }
  }

  const exportQues = () => {
    if (listQuestion.length > startPartIndex[part - 1] - 1) return listQuestion.slice(startAndNumber[0], startAndNumber[1])
    return listQuestion
  }

  return (
    <div className="lg:grid grid-cols-3 lg:space-x-4">
      <div className="col-span-2 relative">
        {/*<div className={"bg-base-100 rounded-xl mt-4 p-4"}><h2>Listening</h2></div>*/}
        {part <= 4 && <div className={"bg-base-100 rounded-xl mt-4 p-4"}>
          <AudioPlayer/>
        </div>}
        <div className={"bg-base-100 rounded-xl mt-4 p-4"}>
          {/*{genTabUI()}*/}
          {exportQues().map((item, index) => (
            <div className={'border-b-primary border-b-2 p-2'} key={index} id={'question-' + index}>
              {/*<Image src={examImg} alt={''} className={''}/>*/}
              <div
                className={'font-semibold bg-backgroundPrimary w-6 h-6 p-2 rounded-full flex items-center justify-center border-primary border-[.5px]'}>
                {index + 1 + startPartIndex[part - 1]}
              </div>
              <div className={'flex flex-row justify-between'}>
                {answers.map((ans, idx) =>
                  <div
                    key={"ans-" + index + "-" + idx}
                    className={'w-[23%] sm:w-1/5 text-center font-semibold bg-base-200 py-2 my-2 rounded-md cursor-pointer text-sm sm:text-base ' + `${(item === answerConfig[ans].value) ? 'active-ques' : 'hover:bg-backgroundPrimary hover:text-black'}`}
                    onClick={() => handleAnsQues(index, ans)}
                  >{ans}</div>)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="block col-span-1 lg:flex flex-col sticky top-20 h-fit lg:h-fit ">
        <div className={"bg-base-100 rounded-xl px-4 py-4 mt-4"}>
          <div className={'grid grid-cols-4 DSxl:grid-cols-5 gap-2'}>
            <div className={'flex items-center justify-center font-semibold text-lg'}>Part</div>
            {[1, 2, 3, 4, 5, 6, 7].map(item =>
              <div
                className={`flex items-center justify-center py-2 bg-backgroundPrimary hover:bg-primary rounded-md hover:text-white cursor-pointer ${part === item ? 'bg-primary text-white' : ''}`}
                key={item}
                onClick={() => {
                  setTabActive(item)
                }}
              >Part {item}</div>)}
          </div>
        </div>
        <div className={"bg-base-100 rounded-xl px-4 pb-4 mt-4"}>
          <h3 className={'!m-2 pt-2'}>Danh sách câu hỏi Part {part}</h3>
          <div className={'grid grid-cols-8 DSxl:grid-cols-5 gap-2'}>
            {listQues.slice(startAndNumber[0], startAndNumber[1]).map((item, index) => <div
              onClick={() => questionClick(index)}
              className={'bg-base-200 p-2 text-sm flex items-center justify-center rounded-md cursor-pointer select-none ' + `${item ? 'active-ques' : ''}`}
              key={index}>{index + 1 + startPartIndex[part - 1]}</div>)}
          </div>
        </div>
        <ButtonPrimary title={'Nộp bài'} className={'w-full mt-4'}
                       handleClick={finishExam}/>
      </div>
    </div>
  );
}

export default PartComponent;
