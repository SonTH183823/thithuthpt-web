import React, {useState} from 'react';
import Image from "next/image";
import {answerConfig, answerConfigArr} from "../../configs/configs";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";
import {genURLImage} from "../../utils/common";

function QuestionItem({item, index, answer}) {
  const router = useRouter()
  const answers = ['A', 'B', 'C', 'D']
  const [showResult, setShow] = useState(false)
  return (
    <div className={'select-none border-b-primary border-b-2 p-2'} key={index} id={'question-' + index}>
      <Image src={genURLImage(item.content)} alt={''} className={'w-full h-full'} width={2000}
             height={200}/>
      <div className={'flex flex-row justify-between'}>
        {answers.map((ans, idx) =>
          <div
            key={"ans-" + index + "-" + idx}
            className={'w-[23%] sm:w-1/5 text-center font-semibold bg-base-200 py-2 my-2 rounded-md cursor-pointer text-sm sm:text-base ' + `${(answer === answerConfig[ans].value) ? 'wrong-ans ' : ' '}` + `${(item.answer === answerConfig[ans].value) ? 'right-ans' : ''}`}
          >{ans}</div>)}
      </div>
      <div className={'flex justify-between md:my-2 my-1 md:text-base text-sm'}>
        <div className={'hover:text-primary cursor-pointer font-semibold'}
             onClick={() => router.push(`/question/${item._id}`)}
        >Nhận xét
        </div>
        <div className={'hover:text-primary cursor-pointer font-semibold'}
             onClick={() => router.push(`/question/${item._id}`)}>Xem chi tiết
        </div>
        <div
          className={`flex space-x-1 flex-row hover:text-primary cursor-pointer font-semibold ${showResult ? 'text-primary' : ''}`}
          onClick={() => setShow(!showResult)}>
          <span>Lời giải</span>
          <FontAwesomeIcon icon={faChevronDown} className={`w-4 ${!showResult ? 'rotate-180' : ''} `}/>
        </div>
      </div>
      {showResult ?
        <div>
          <div className={'font-semibold text-center border-t-primary border-t-2 ml-8 py-2'}>Lời giải</div>
          <div className={'font-semibold'}>Câu {index + 1}: Đáp án đúng {answerConfigArr[item.answer].label}</div>
          {
            item.explanation ?
              <Image src={genURLImage(item.explanation)} alt={''} className={'w-full h-full'} width={2000}
                     height={200}/> :
              <div className={'text-center'}>
                {item.description ? item.description : 'Không có lời giải'}
              </div>
          }
        </div> : null}
    </div>
  );
}

``
export default QuestionItem;
