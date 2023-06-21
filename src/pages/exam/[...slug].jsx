import InteractiveContainer from "@/components/interactive/InteractiveContainer";
import React, {Fragment, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import DetailExam from "@/components/exam/DetailExam";
import BXH from "@/components/exam-details/BXH";
import TableTypeListQues from "@/components/exam-details/TableTypeListQues";
import RelatedExam from "@/components/exam-details/RelatedExam";
import RatingComponents from "@/components/rating/RatingComponents";
import {ExamAPI} from "../../apis/exam";

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
  const profile = useSelector((state) => state.auth.profile);
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(null);
  const [relatedExam, setRelatedExam] = useState([]);
  const favoriteExams = useSelector((state) => state.exam.favoriteExams);
  const dispatch = useDispatch();

  useEffect(() => {
      if (favoriteExams && exam._id) {
          const p = favoriteExams.find((i) => i.examId._id === exam._id);
          if (p) {
              setIsFavorite(true);
          }
      }
  }, [favoriteExams]);

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
            const ftdt = res.data.filter(item => item._id !== exam._id)
            setRelatedExam(ftdt);
          }
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [router.query]);

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
                <div className={"bg-base-100 p-4 !pt-1 rounded-xl mt-4"}>
                  <TableTypeListQues listTypeQuestion={exam.listTypeQuestion} total={exam.questionIds.length}/>
                </div>
                <RatingComponents/>
                <div className={"bg-base-100 p-4 !pt-1 rounded-xl mt-4"}>
                  <InteractiveContainer postId={exam._id} userId={profile._id}/>
                </div>
              </div>
              <div className="block col-span-1 lg:flex flex-col">
                <div className={"bg-base-100 rounded-xl px-4 hidden lg:block"}>
                  <BXH idExam={12}/>
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
