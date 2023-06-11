import React, {useEffect, useState} from 'react';
import image from '../../assets/images/toeic/1.webp'
import Image from "next/image";
import CountDown from "@/components/exam-details/CountDown";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import {answerConfig} from "../../configs/configs";
import AudioPlayer from "@/components/audio/AudioPlayer";

function PartComponent({part, setTabActive}) {
  const answers = ['A', 'B', 'C', 'D']
  let oldPosition = null
  const [listQues, setListQues] = useState([])
  useEffect(() => {
    switch (part) {
      case 1: {
        setListQues([...Array(6).fill(0)])
        break
      }
      case 2: {
        setListQues([...Array(30).fill(0)])
        break
      }
      case 3: {
        setListQues([...Array(40).fill(0)])
        break
      }
      case 4: {
        setListQues([...Array(50).fill(0)])
        break
      }
      case 5: {
        setListQues([...Array(34).fill(0)])
        break
      }
      case 6: {
        setListQues([...Array(45).fill(0)])
        break
      }
      case 7: {
        setListQues([...Array(12).fill(0)])
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

  return (
    <div className="lg:grid grid-cols-3 lg:space-x-4">
      <div className="col-span-2 relative">
        {part <= 4 && <div className={"bg-base-100 rounded-xl mt-4 p-4"}>
          <AudioPlayer/>
        </div>}
        <div className={"bg-base-100 rounded-xl mt-4 p-4"}>
          {/*{genTabUI()}*/}
          {listQues.map((item, index) => (
            <div className={'border-b-primary border-b-2 p-2'} key={index} id={'question-' + index}>
              {/*<Image src={examImg} alt={''} className={''}/>*/}
              <div>Câu {index + 1}</div>
              <div className={'flex flex-row justify-between'}>
                {answers.map((ans, idx) =>
                  <div
                    key={"ans-" + index + "-" + idx}
                    className={'w-[23%] sm:w-1/5 text-center font-semibold bg-base-200 py-2 my-2 rounded-md cursor-pointer text-sm sm:text-base ' + `${(item === answerConfig[ans].value) ? 'active-ques' : 'hover:bg-backgroundPrimary hover:text-black'}`}
                    onClick={() => handleAnsQues(index, ans)}
                  >{ans}{index + 1}</div>)}
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
            {listQues.map((item, index) => <div
              onClick={() => questionClick(index)}
              className={'bg-base-200 p-2 text-sm flex items-center justify-center rounded-md cursor-pointer select-none ' + `${item ? 'active-ques' : ''}`}
              key={index}>{index + 1}</div>)}
          </div>
        </div>
        <ButtonPrimary title={'Nộp bài'} className={'w-full mt-4'}
                       handleClick={finishExam}/>
      </div>
    </div>
  );
}

export default PartComponent;
