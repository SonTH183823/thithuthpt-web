import React, {Fragment, useEffect, useState} from "react";
import DetailExam from "@/components/exam/DetailExam";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import Image from "next/image";
import examImg from '@/assets/images/exam.jpeg'
import ButtonSecondary from "@/components/button/ButtonSecondary";
import CountDown from "@/components/exam-details/CountDown";

export default function DoExam() {
    const [idx, setIndex] = useState(0)
    const exam = {
        id: 1
    }
    const listQues = [false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    const answers = ['A', 'B', 'C', 'D']
    const questionClick = (index) => {
        // listQues[index] = !listQues[index]
        listQues[index] = true
    }
    const keyIndex = () => {
        setIndex(idx + 1)
    }
    return (<Fragment>
        {exam.id ? (<div className={"bg-base-200"}>
            <div className="container mx-auto py-4 padding-mobile">
                <div className="lg:grid grid-cols-3 lg:space-x-4">
                    <div className="col-span-2 relative">
                        <div className={"bg-base-100 rounded-xl "}>
                            <DetailExam isDoExam={true}/>
                        </div>
                        <div className={"bg-base-100 rounded-xl mt-4 p-4"}>
                            {listQues.map((item, index) => (
                                <div className={'border-b-primary border-b-2 p-2'} key={index}>
                                    <Image src={examImg} alt={''} className={''}/>
                                    <div className={'flex flex-row justify-between'}>
                                        {answers.map((item, idx) =>
                                            <label
                                                className={'w-1/5 text-center font-bold bg-base-200 py-2 my-2 rounded-md cursor-pointer hover:bg-backgroundPrimary '}>
                                                {item}</label>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="hidden col-span-1 lg:flex flex-col !fixed !sticky !top-[0px]">
                        <div className={"bg-base-100 rounded-xl px-4 "}>
                            <h3 className={'!m-2'}>Thời gian còn lại</h3>
                            <CountDown />
                        </div>
                        <div className={"bg-base-100 rounded-xl px-4 pb-4 mt-4"}>
                            <h3 className={'!m-2'}>Danh sách câu hỏi</h3>
                            <div className={'grid grid-cols-5 gap-2'} key={idx}>
                                {listQues.map((item, index) => <div
                                    onClick={() => questionClick(index)}
                                    className={'bg-base-200 p-2 text-sm flex items-center justify-center rounded-md cursor-pointer select-none ' + `${item ? 'active-ques' : ''}`}
                                    key={index}>{index + 1}</div>)}
                            </div>
                            <ButtonPrimary title={'Nộp bài'} className={'w-full mt-4'}/>
                        </div>
                    </div>
                </div>
            </div>
            {/*<ModalReportPost id={"modal-report-post"} postId={post.id} />*/}
            {/*<ModalShare id={"modal-share-post"} title={exam.title}/>*/}
        </div>) : null}
    </Fragment>)
}
