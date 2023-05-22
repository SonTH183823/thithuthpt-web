import React, {Fragment, useState} from 'react';
import DetailExam from "@/components/exam/DetailExam";
import InteractiveContainer from "@/components/interactive/InteractiveContainer";
import BXH from "@/components/exam-details/BXH";
import RelatedExam from "@/components/exam-details/RelatedExam";
import ModalShare from "@/components/modal/ModalShare";
import RatingComponents from "@/components/rating/RatingComponents";
import ResultComponents from "@/components/result/ResultComponents";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import Image from "next/image";
import examImg from "@/assets/images/exam.jpeg";
import {answerConfig} from "../../configs/configs";
import QuestionItem from "@/components/question/QuestionItem";

function

HistoryDetail({
                exam = {
                  id: 1,
                  title: 'Bai thi mau'
                }
              }) {
  let oldPosition = null
  const [listQues, setListQues] = useState(Array(50).fill(0))
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
  return (
    <Fragment>
      {exam.id ? (
        <div className={"bg-base-200"}>
          <div className="container mx-auto py-2 sm:py-4 padding-mobile">
            <div className="lg:grid grid-cols-3 lg:space-x-4">
              <div className="col-span-2 relative">
                <div className={"bg-base-100 rounded-xl "}>
                  <DetailExam/>
                </div>
                <ResultComponents/>
                <RatingComponents/>
                <div className={"bg-base-100 rounded-xl mt-4 p-4"}>
                  {listQues.map((item, index) => (
                    // <div className={'border-b-primary border-b-2 p-2'} key={index} id={'question-' + index}>
                    //   <Image src={examImg} alt={''} className={''}/>
                    //   <div className={'flex flex-row justify-between'}>
                    //     {answers.map((ans, idx) =>
                    //       <div
                    //         key={"ans-" + index + "-" + idx}
                    //         className={'w-[23%] sm:w-1/5 text-center font-semibold bg-base-200 py-2 my-2 rounded-md cursor-pointer text-sm sm:text-base ' + `${(item === answerConfig[ans].value) ? 'active-ques' : 'hover:bg-backgroundPrimary hover:text-black'}`}
                    //       >{ans}{index + 1}</div>)}
                    //   </div>
                    // </div>
                    <QuestionItem index={index} item={item}/>
                  ))}
                  <div className={'text-primary text-center font-semibold mt-4'}>- HẾT -</div>
                </div>
                <div className={"bg-base-100 p-4 !pt-1 rounded-xl mt-4"}>
                  <InteractiveContainer postId={exam.id}/>
                </div>
              </div>
              <div className="block col-span-1 lg:flex flex-col sticky top-20 h-screen lg:h-fit">
                <div className={"bg-base-100 rounded-xl px-4 pb-4"}>
                  <h3 className={'!m-2'}>Danh sách câu hỏi</h3>
                  <div className={'grid grid-cols-8 DSxl:grid-cols-5 gap-2'}>
                    {listQues.map((item, index) => <div
                      onClick={() => questionClick(index)}
                      className={'bg-base-200 p-2 text-sm flex items-center justify-center rounded-md cursor-pointer select-none ' + `${index % 2 === 0 ? 'wrong-ans' : 'right-ans'}` + `${index % 3 === 0 ? '' : 'right-ans'}`}
                      key={'history' + index}>{index + 1}</div>)}
                  </div>
                </div>
                <div className={"bg-base-100 rounded-xl px-4 mt-4"}>
                  <RelatedExam idExam={12}/>
                </div>
              </div>
            </div>
          </div>
          {/*<ModalReportPost id={"modal-report-post"} postId={post.id} />*/}
          <ModalShare id={"modal-share-post"} title={exam.title}/>
        </div>
      ) : null}
    </Fragment>
  )
    ;
}

export default HistoryDetail;