import React from 'react';
import Image from "next/image";
import examImg from "@/assets/images/exam.jpeg";
import {answerConfig} from "../../configs/configs";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";

function QuestionItem({item, index}) {
  const answers = ['A', 'B', 'C', 'D']
  return (
    <div className={'border-b-primary border-b-2 p-2'} key={index} id={'question-' + index}>
      <div className={'flex justify-between h-5'}>
        <div >Câu {index + 1}: Đáp án đúng A</div>
        <FontAwesomeIcon icon={faChevronDown} className={'text-primar'}/>
      </div>
      <Image src={examImg} alt={''} className={''}/>
      <div className={'flex flex-row justify-between'}>
        {answers.map((ans, idx) =>
          <div
            key={"ans-" + index + "-" + idx}
            className={'w-[23%] sm:w-1/5 text-center font-semibold bg-base-200 py-2 my-2 rounded-md cursor-pointer text-sm sm:text-base ' + `${(item === answerConfig[ans].value) ? 'active-ques' : ''}`}
          >{ans}{index + 1}</div>)}
      </div>
    </div>
  );
}

``
export default QuestionItem;