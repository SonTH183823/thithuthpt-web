import React, {Fragment, useEffect, useRef, useState} from "react";
import DetailExam from "@/components/exam/DetailExam";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import Image from "next/image";
import examImg from '@/assets/images/exam.jpeg'
import examImg2 from '@/assets/images/test/tets.png'
import CountDown from "@/components/exam-details/CountDown";
import {answerConfig} from "../../configs/configs";
import FourOhFour from "../404";
import LayoutWithoutFooter from "@/components/layout/LayoutWithoutFooter";
import ModalConfirmFinishExam from "@/components/modal/ModalConfirmFinishExam";
import {ExamAPI} from "../../apis/exam";
import {genURLImage} from "../../utils/common";

export async function getServerSideProps({params}) {
  let exam = {};
  let listQuestion = []
  try {
    const id = params.slug[0].split("-").slice(-1);
    exam = await ExamAPI.getExam(id);
    const res = await ExamAPI.getListQuestionExam({id: id});
    listQuestion = res.questionIds
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      exam,
      listQuestion
    },
  };
}

export default function DoExam({exam, listQuestion}) {
  let oldPosition = null
  const [listQues, setListQues] = useState(Array(listQuestion.length).fill(0))
  const answers = ['A', 'B', 'C', 'D']
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

  return (<Fragment>
    {exam._id ? (<div className={"bg-base-200"}>
      <div className="container mx-auto py-4 padding-mobile">
        <div className="lg:grid grid-cols-3 lg:space-x-4">
          <div className="col-span-2 relative">
            <div className={"bg-base-100 rounded-xl "}>
              <DetailExam item={exam} isShowRs={false}/>
            </div>
            <div className={"bg-base-100 rounded-xl mt-4 p-4"}>
              {listQuestion.map((item, index) => (
                <div className={'border-b-primary border-b-2 p-2'} key={'question-' + item._id}
                     id={'question-' + index}>
                  <Image src={genURLImage(item.content)} alt={''} className={'w-full h-full'} width={2000}
                         height={200}/>
                  <div className={'flex flex-row justify-between'}>
                    {answers.map((ans, idx) =>
                      <div
                        key={"ans-" + index + "-" + idx}
                        className={'w-[23%] sm:w-1/5 text-center font-semibold bg-base-200 py-2 my-2 rounded-md cursor-pointer text-sm sm:text-base ' + `${(listQues[index] === answerConfig[ans].value) ? 'active-ques' : 'hover:bg-backgroundPrimary hover:text-black'}`}
                        onClick={() => handleAnsQues(index, ans)}
                      >{ans}</div>)}
                  </div>
                </div>
              ))}
              <div className={'text-primary text-center font-semibold mt-4'}>- HẾT -</div>
            </div>
          </div>
          <div className="block col-span-1 lg:flex flex-col sticky top-20 h-screen lg:h-fit">
            <div className={"bg-base-100 rounded-xl px-4 "}>
              <h3 className={'!m-2'}>Thời gian còn lại</h3>
              <CountDown mis={exam.time}/>
            </div>
            <div className={"bg-base-100 rounded-xl px-4 pb-4 mt-4"}>
              <h3 className={'!m-2'}>Danh sách câu hỏi</h3>
              <div className={'grid grid-cols-8 DSxl:grid-cols-5 gap-2'}>
                {listQues.map((item, index) => <div
                  onClick={() => questionClick(index)}
                  className={'bg-base-200 p-2 text-sm flex items-center justify-center rounded-md cursor-pointer select-none ' + `${item ? 'active-ques' : ''}`}
                  key={'listquess-' + index}>{index + 1}</div>)}
              </div>
              <ButtonPrimary title={'Nộp bài'} className={'w-full mt-4'}
                             handleClick={finishExam}/>
            </div>
          </div>
        </div>
      </div>
      <ModalConfirmFinishExam id={'modal-confirm-finish-exam-id'}/>
    </div>) : <FourOhFour/>}
  </Fragment>)
}

DoExam.Layout = LayoutWithoutFooter;
