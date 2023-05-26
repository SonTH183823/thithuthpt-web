import React, {useState} from 'react';
import Image from "next/image";
import examImg from "@/assets/images/exam.jpeg";
import {answerConfig} from "../../configs/configs";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {Menu, MenuButton, MenuItem} from "@szhsin/react-menu";

function QuestionItem({item, index}) {
  const answers = ['A', 'B', 'C', 'D']
  const [showResult, setShow] = useState(false)
  return (
    <div className={'select-none border-b-primary border-b-2 p-2'} key={index} id={'question-' + index}>
      {/*<div className={'flex justify-between h-5'}>*/}

      {/*  <Menu menuButton={*/}
      {/*    <MenuButton className={''}>*/}
      {/*      <i className="fa-regular fa-ellipsis"></i>*/}
      {/*    </MenuButton>*/}
      {/*  } transition>*/}
      {/*    <MenuItem>Nhận xét</MenuItem>*/}
      {/*    <MenuItem>Xem chi tiết</MenuItem>*/}
      {/*  </Menu>*/}
      {/*</div>*/}
      <Image src={examImg} alt={''} className={''}/>
      <div className={'flex flex-row justify-between'}>
        {answers.map((ans, idx) =>
          <div
            key={"ans-" + index + "-" + idx}
            className={'w-[23%] sm:w-1/5 text-center font-semibold bg-base-200 py-2 my-2 rounded-md cursor-pointer text-sm sm:text-base ' + `${(item === answerConfig[ans].value) ? 'active-ques' : ''}`}
          >{ans}{index + 1}</div>)}
      </div>
      <div className={'flex justify-between h-5 my-2'}>
        <div className={'hover:text-primary cursor-pointer font-semibold'}>Nhận xét (69)</div>
        <div className={'hover:text-primary cursor-pointer font-semibold'}>Xem chi tiết</div>
        <div
          className={`flex space-x-1 flex-row hover:text-primary cursor-pointer font-semibold ${showResult ? 'text-primary' : ''}`}
          onClick={() => setShow(!showResult)}>
          <span>Lời giải</span>
          <FontAwesomeIcon icon={faChevronDown} className={`w-4 ${!showResult ? 'rotate-180' : ''} `}/>
        </div>
      </div>
      {showResult ?
        <div>
          {/*<div className={'font-semibold'}>Câu {index + 1}: Đáp án đúng A</div>*/}
          <div className={'font-semibold text-center border-t-primary border-t-2 ml-8 py-2'}>Lời giải</div>
          <Image src={examImg} alt={''} className={''}/>
        </div> : null}
    </div>
  );
}

``
export default QuestionItem;
