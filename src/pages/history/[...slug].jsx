import React, {Fragment, useEffect, useState} from 'react';
import DetailExam from "@/components/exam/DetailExam";
import RelatedExam from "@/components/exam-details/RelatedExam";
import RatingComponents from "@/components/rating/RatingComponents";
import ResultComponents from "@/components/result/ResultComponents";
import QuestionItem from "@/components/question/QuestionItem";
import {DocumentAPI} from "../../apis/document";
import {ExamAPI} from "../../apis/exam";
import {useRouter} from "next/router";
import {HistoryAPI} from "../../apis/history";
import {answerConfig} from "../../configs/configs";
import TableTypeListQuesHistory from "@/components/history/TableTypeListQues";

export async function getServerSideProps({params}) {
  let history = {};
  let exam = {}
  let listQuestion = []
  try {
    const id = params.slug[0].split("-").slice(-1);
    history = await HistoryAPI.getHistoryById(id)
    const res = await ExamAPI.getListQuestionExam({id: history.examId._id});
    listQuestion = res.questionIds
    exam = history.examId
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      history,
      exam,
      listQuestion
    },
  };
}

function HistoryDetail({exam, listQuestion, history}) {
  let oldPosition = null
  const listAnswer = history.listAnswer
  const [relatedExam, setRelatedExam] = useState([]);
  const router = useRouter()

  useEffect(() => {
    (async () => {
      try {
        if (exam._id) {
          const {subject} = exam; //add filter in here
          const res = await ExamAPI.getRelatedExam({
            id: exam._id,
            data: {subject}
          });
          if (res) {
            const ftdt = res.filter(item => item._id !== exam._id)
            setRelatedExam(ftdt);
          }
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [router.query]);
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
      {exam._id ? (
        <div className={"bg-base-200"}>
          <div className="container mx-auto py-2 sm:py-4 padding-mobile">
            <div className="lg:grid grid-cols-3 lg:space-x-4">
              <div className="col-span-2 relative">
                <div className={"bg-base-100 rounded-xl "}>
                  <DetailExam item={exam} isDoExam={true} isDoAgain={true} isShowRs={false}/>
                </div>
                <ResultComponents exam={exam} history={history}/>
                <TableTypeListQuesHistory exam={exam} history={history}/>
                <RatingComponents postId={exam._id}/>
                <div className={"bg-base-100 rounded-xl px-4 pb-4 mt-4 lg:hidden block"}>
                  <h3 className={'!m-2 pt-2'}>Danh sách câu hỏi</h3>
                  <div className={'grid grid-cols-8 DSxl:grid-cols-5 gap-2'}>
                    {listAnswer.map((item, index) => <div
                      onClick={() => questionClick(index)}
                      className={'bg-base-200 p-2 text-sm flex items-center justify-center rounded-md cursor-pointer select-none ' + `${(item === listQuestion[index].answer) ? 'right-ans' : 'wrong-ans'}`}
                      key={'history' + index}>{index + 1}</div>)}
                  </div>
                </div>
                <div className={"bg-base-100 rounded-xl mt-4 md:p-4 p-1"}>
                  {listQuestion.map((item, index) => (
                    <QuestionItem index={index} item={item} answer={listAnswer[index]} examId={exam._id}/>))}
                  <div className={'text-primary text-center font-semibold mt-4'}>- HẾT -</div>
                </div>
              </div>
              <div className="block col-span-1 lg:flex flex-col sticky top-20 h-screen lg:h-fit">
                <div className={"bg-base-100 rounded-xl px-4 pb-4 lg:block hidden"}>
                  <h3 className={'!m-2'}>Danh sách câu hỏi</h3>
                  <div className={'grid grid-cols-8 gap-2'}>
                    {listAnswer.map((item, index) => <div
                      onClick={() => questionClick(index)}
                      className={'bg-base-200 p-2 text-sm flex items-center justify-center rounded-md cursor-pointer select-none ' + `${(item === listQuestion[index].answer) ? 'right-ans' : 'wrong-ans'}`}
                      key={'history' + index}>{index + 1}</div>)}
                  </div>
                </div>
                <div className={"bg-base-100 rounded-xl px-4 mt-4"}>
                  <RelatedExam relatedExam={relatedExam}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
}

export default HistoryDetail;
