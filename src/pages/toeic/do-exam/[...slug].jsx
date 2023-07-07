import React, {Fragment, useEffect, useRef, useState} from "react";
import DetailExam from "@/components/exam/DetailExam";
import CountDown from "@/components/exam-details/CountDown";
import FourOhFour from "../../404";
import LayoutWithoutFooter from "@/components/layout/LayoutWithoutFooter";
import AudioPlayer from "@/components/audio/AudioPlayer";
import ModalConfirmFinishExam from "@/components/modal/ModalConfirmFinishExam";
import PartComponent from "@/components/toeic/PartComponent";
import {ExamAPI} from "../../../apis/exam";
import SubPartComponent from "@/components/toeic/SubPartComponent";
import {HistoryAPI} from "../../../apis/history";
import {strToSlug} from "../../../utils/common";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import eventEmitter from "../../../utils/eventEmitter";

export async function getServerSideProps({params}) {
  let exam = {};
  let listQuestion = []
  try {
    const id = params.slug[0].split("-").slice(-1);
    exam = await ExamAPI.getExam(id);
    const {listeningQuestion, readingQuestion} = await ExamAPI.getListQuestionExam({id: id});
    listQuestion = [...listeningQuestion, ...readingQuestion]
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

export default function DoToeic({exam, listQuestion}) {
  const [time, setTime] = useState(exam.time * 60)
  const [tabActive, setTabActive] = useState(1)
  const router = useRouter()
  const [listAnswer, setListAnswer] = useState([])
  useEffect(() => {
    setTimeout(async () => {
      await ExamAPI.countTestView(exam._id, {type: 'test'})
    }, 3000)
  }, [exam._id])

  useEffect(() => {
    if (time === 0) {
      onFinishExam()
    }
  }, [time])

  useEffect(() => {
    eventEmitter.on('submit-toeic-ans', (data) => {
      setListAnswer([...data])
    })
  }, [])

  const onFinishExam = async () => {
    const data = {
      examId: exam._id,
      listListeningAnswer: listAnswer.splice(0, exam.numberListening),
      listReadingAnswer: listAnswer,
      timeSpent: exam.time * 60 - time
    }
    const res = await HistoryAPI.finishExam(data)
    if (res) {
      router.push(`/history/${strToSlug(exam.title)}-${res._id}`);
    } else {
      toast.error("Đã có lỗi xảy ra!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  return (<Fragment>
    {exam._id ? (<div className={"bg-base-200"}>
        <div className="container mx-auto py-4 padding-mobile relative">
          <div className="lg:grid grid-cols-3 lg:space-x-4">
            <div className="col-span-2 relative">
              <div className={"bg-base-100 rounded-xl "}>
                <DetailExam isDoExam={false} isShowRs={false} item={exam}/>
              </div>
            </div>
            <div className="block col-span-1 lg:flex flex-col sticky top-20 h-fit lg:h-fit ">
              <div className={"bg-base-100 rounded-xl px-4 lg:block hidden"}>
                <h3 className={'!m-2 !mb-3'}>Thời gian còn lại</h3>
                <CountDown time={time} setTime={setTime}/>
              </div>
            </div>
          </div>
          {
            exam.cateToeic === 2 ?
              <SubPartComponent part={tabActive} setTabActive={setTabActive} listQuestion={listQuestion}
                                numberListening={exam.numberListening} listeningFile={exam.listeningFile}/> :
              <PartComponent part={tabActive} setTabActive={setTabActive} listQuestion={listQuestion} listeningFile={exam.listeningFile}/>
          }
          <div className={"bg-base-100 rounded-xl px-4 lg:hidden block mt-4"}>
            <h3 className={'!m-2 !mb-3'}>Thời gian còn lại</h3>
            <CountDown time={time} setTime={setTime}/>
          </div>
        </div>
        <ModalConfirmFinishExam id={'modal-confirm-finish-exam-id'} handleClick={onFinishExam}/>
      </div>
    ) : <FourOhFour/>}
  </Fragment>)
}

DoToeic.Layout = LayoutWithoutFooter;
