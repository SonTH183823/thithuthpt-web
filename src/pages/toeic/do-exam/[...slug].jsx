import React, {Fragment, useEffect, useRef, useState} from "react";
import DetailExam from "@/components/exam/DetailExam";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import Image from "next/image";
import examImg from '@/assets/images/exam.jpeg'
import examImg2 from '@/assets/images/test/tets.png'
import CountDown from "@/components/exam-details/CountDown";
import {answerConfig} from "../../../configs/configs";
import FourOhFour from "../../404";
import LayoutWithoutFooter from "@/components/layout/LayoutWithoutFooter";
import AudioPlayer from "@/components/audio/AudioPlayer";
import ModalConfirmFinishExam from "@/components/modal/ModalConfirmFinishExam";
import PartComponent from "@/components/toeic/PartComponent";

export default function DoToeic() {
  const exam = {id: 1}
  let oldPosition = null
  const [listQues, setListQues] = useState(Array(200).fill(0))
  const answers = ['A', 'B', 'C', 'D']
  const [type, setType] = useState('listen')
  const [tabActive, setTabActive] = useState(1)

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
    {exam.id ? (<div className={"bg-base-200"}>
        <div className="container mx-auto py-4 padding-mobile relative">
          <div className="lg:grid grid-cols-3 lg:space-x-4">
            <div className="col-span-2 relative">
              <div className={"bg-base-100 rounded-xl "}>
                <DetailExam isDoExam={false} isShowRs={false}/>
              </div>
            </div>
            <div className="block col-span-1 lg:flex flex-col sticky top-20 h-fit lg:h-fit ">
              <div className={"bg-base-100 rounded-xl px-4 "}>
                <h3 className={'!m-2 !mb-3'}>Thời gian còn lại</h3>
                <CountDown/>
              </div>
            </div>
          </div>
          <PartComponent part={tabActive} setTabActive={setTabActive}/>
          <div className={"bg-base-100 rounded-xl px-4 lg:hidden flex mt-4"}>
            <h3 className={'!m-2 !mb-3'}>Thời gian còn lại</h3>
            <CountDown/>
          </div>
        </div>
        <ModalConfirmFinishExam id={'modal-confirm-finish-exam-id'}/>
      </div>
    ) : <FourOhFour/>}
  </Fragment>)
}

DoToeic.Layout = LayoutWithoutFooter;