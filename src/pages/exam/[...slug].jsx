import InteractiveContainer from "@/components/interactive/InteractiveContainer";
import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import DetailExam from "@/components/exam/DetailExam";
import BXH from "@/components/exam-details/BXH";
import TableTypeListQues from "@/components/exam-details/TableTypeListQues";
import RelatedExam from "@/components/exam-details/RelatedExam";
import RatingComponents from "@/components/rating/RatingComponents";
import {ExamAPI} from "../../apis/exam";
import {typePostConfig} from "../../configs/configs";

export async function getServerSideProps({params}) {
  let exam = {};
  try {
    const id = params.slug[0].split("-").slice(-1);
    exam = await ExamAPI.getExam(id);
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      exam,
    },
  };
}

export default function ExamDetail({exam}) {
  const router = useRouter();
  const [relatedExam, setRelatedExam] = useState([]);

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

  useEffect(() => {
    setTimeout(async () => {
      await ExamAPI.countTestView(exam._id, {type: 'view'})
    }, 3000)
  }, [exam._id])

  return (
    <Fragment>
      {exam._id ? (
        <div className={"bg-base-200"}>
          <div className="container mx-auto py-2 sm:py-4 padding-mobile">
            <div className="lg:grid grid-cols-3 lg:space-x-4">
              <div className="col-span-2 relative">
                <div className={"bg-base-100 rounded-xl "}>
                  <DetailExam isDoExam={true} item={exam}/>
                </div>
                {exam?.description && <div className={"bg-base-100 p-4 !pt-1 rounded-xl mt-4"}>
                  <div className={'mt-4'}>Mô tả</div>
                  <div>{exam.description}</div>
                </div>}
                <div className={"bg-base-100 p-4 !pt-1 rounded-xl mt-4"}>
                  <TableTypeListQues item={exam}/>
                </div>
                <RatingComponents postId={exam._id}/>
                <div className={"bg-base-100 p-4 !pt-1 rounded-xl mt-4"}>
                  <InteractiveContainer postId={exam._id} title={exam.title} typePost={typePostConfig.EXAM}/>
                </div>
              </div>
              <div className="block col-span-1 lg:flex flex-col">
                <div className={"bg-base-100 rounded-xl px-4 hidden lg:block"}>
                  <BXH idExam={exam._id}/>
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
