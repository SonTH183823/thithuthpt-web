import React, {Fragment} from 'react';
import DetailExam from "@/components/exam/DetailExam";
import InteractiveContainer from "@/components/interactive/InteractiveContainer";
import BXH from "@/components/exam-details/BXH";
import RelatedExam from "@/components/exam-details/RelatedExam";
import ModalShare from "@/components/modal/ModalShare";
import RatingComponents from "@/components/rating/RatingComponents";
import ResultComponents from "@/components/result/ResultComponents";

function

HistoryDetail({
                exam = {
                  id: 1,
                  title: 'Bai thi mau'
                }
              }) {
  return (
    <Fragment>
      {exam.id ? (
        <div className={"bg-base-200"}>
          <div className="container mx-auto py-2 sm:py-4 padding-mobile">
            <div className="lg:grid grid-cols-3 lg:space-x-4">
              <div className="col-span-2 relative">
                <div className={"bg-base-100 rounded-xl "}>
                  <DetailExam />
                </div>
                <ResultComponents />
                <RatingComponents/>
                <div className={"bg-base-100 p-4 !pt-1 rounded-xl mt-4"}>
                  <InteractiveContainer postId={exam.id}/>
                </div>
              </div>
              <div className="block col-span-1 lg:flex flex-col">
                <div className={"bg-base-100 rounded-xl px-4 hidden lg:block"}>
                  <BXH idExam={12}/>
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