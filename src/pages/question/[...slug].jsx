import InteractiveContainer from "@/components/interactive/InteractiveContainer";
import React, {Fragment, useEffect, useState} from "react";
import {useRouter} from "next/router";
import BXH from "@/components/exam-details/BXH";
import RelatedExam from "@/components/exam-details/RelatedExam";
import QuestionDetail from "@/components/question/QuestionDetail";
import {QuestionAPI} from "../../apis/question";
import {ExamAPI} from "../../apis/exam";
import {typePostConfig} from "../../configs/configs";

export async function getServerSideProps({params}) {
  let question = {};
  try {
    const id = params.slug[0].split("-").slice(-1);
    question = await QuestionAPI.getQuestionById(id)
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      question
    },
  };
}


export default function Question({question}) {
  const router = useRouter()
  const examId = router.query.exam
  const [relatedExam, setRelatedExam] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        if (examId) {
          const {subject} = question //add filter in here
          const res = await ExamAPI.getRelatedExam({
            id: examId,
            data: {subject}
          });
          if (res) {
            setRelatedExam(res);
          }
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [router.query]);

  return (
    <Fragment>
      {question._id ? (
        <div className={"bg-base-200"}>
          <div className="container mx-auto py-2 sm:py-4 padding-mobile">
            <div className="lg:grid grid-cols-3 lg:space-x-4">
              <div className="col-span-2 relative">
                <div className={"bg-base-100 rounded-xl "}>
                  <QuestionDetail question={question}/>
                </div>
                <div className={"bg-base-100 rounded-xl "}>

                </div>
                <div className={"bg-base-100 p-4 !pt-1 rounded-xl mt-4"}>
                  <InteractiveContainer postId={question._id} typePost={typePostConfig.QUESTION} title={''}/>
                </div>
              </div>
              <div className="block col-span-1 lg:flex flex-col">
                <div className={"bg-base-100 rounded-xl px-4 block"}>
                  <BXH idExam={examId}/>
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
