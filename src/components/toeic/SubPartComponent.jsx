import React, {useEffect, useState} from 'react';
import image from '../../assets/images/toeic/1.webp'
import Image from "next/image";
import CountDown from "@/components/exam-details/CountDown";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import {answerConfig} from "../../configs/configs";
import AudioPlayer from "@/components/audio/AudioPlayer";
import ModalConfirmFinishExam from "@/components/modal/ModalConfirmFinishExam";
import eventEmitter from "../../utils/eventEmitter";
import {genURLImage} from "../../utils/common";

function PartComponent({part, setTabActive, listQuestion, numberListening, listeningFile}) {
    const answers = ['A', 'B', 'C', 'D']
    let oldPosition = null
    const [listQues, setListQues] = useState([...Array(listQuestion.length).fill(0)])
    const [startAndNumber, SetStartAndNumber] = useState([0, numberListening])
    const startPartIndex = [0, numberListening, listQuestion.length]
    useEffect(() => {
        switch (part) {
            case 1: {
                SetStartAndNumber([0, numberListening])
                break
            }
            case 2: {
                SetStartAndNumber([numberListening, listQuestion.length])
                break
            }
        }
    }, [part])
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
        eventEmitter.emit('submit-toeic-ans', listQues)
        const modal = document.getElementById("modal-confirm-finish-exam-id");
        if (modal) {
            modal.click();
        }
    }

    const exportQues = () => {
        if (listQuestion.length > startPartIndex[part - 1] - 1) return listQuestion.slice(startAndNumber[0], startAndNumber[1])
        return listQuestion
    }

    return (
        <div className="lg:grid grid-cols-3 lg:space-x-4">
            <div className="col-span-2 relative">
                {part === 1 && <div className={"bg-base-100 rounded-xl mt-4 p-4"}>
                    <AudioPlayer link={listeningFile}/>
                </div>}
                <div className={"bg-base-100 rounded-xl mt-4 p-4"}>
                    {exportQues().map((item, index) => (
                        <div className={'border-b-primary border-b-2 p-2'} key={index} id={'question-' + index}>
                            <div className={'flex mb-2'}>
                                <div
                                    className={'font-semibold bg-backgroundPrimary w-6 h-6 p-2 rounded-full flex items-center justify-center border-primary border-[.5px]'}>
                                    {index + 1 + startPartIndex[part - 1]}
                                </div>
                                <div className={'ml-2 font-semibold'}>{item.content}</div>
                            </div>
                            <div className={'w-full my-2'}>
                                {item?.description ?
                                    <Image
                                        src={genURLImage(item.description)}
                                        alt={''}
                                        className={'w-full h-full cursor-pointer'}
                                        width={2000}
                                        height={200}/> : null}
                            </div>
                            <div className={'grid grid-cols-2 gap-2'}>
                                {item.questions.map((i, indexx) => <div><span
                                    className={'font-semibold'}>{answers[indexx]}.</span> {i}
                                </div>)}
                            </div>

                            <div className={'flex flex-row justify-between'}>
                                {answers.map((ans, idx) =>
                                    <div
                                        key={"ans-" + index + startPartIndex[part - 1] + "-" + idx}
                                        className={'w-[23%] sm:w-1/5 text-center font-semibold bg-base-200 py-2 my-2 rounded-md cursor-pointer text-sm sm:text-base ' + `${(listQues[index + startPartIndex[part - 1]] === answerConfig[ans].value) ? 'active-ques' : 'hover:bg-backgroundPrimary hover:text-black'}`}
                                        onClick={() => handleAnsQues(index + startPartIndex[part - 1], ans)}
                                    >{ans}</div>)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="block col-span-1 lg:flex flex-col sticky top-20 h-fit lg:h-fit ">
                <div className={"bg-base-100 rounded-xl px-4 py-4 mt-4"}>
                    <div className={'grid grid-cols-4 DSxl:grid-cols-5 gap-2'}>
                        <div className={'flex items-center justify-center font-semibold text-lg'}>Part</div>
                        {[1, 2].map(item =>
                            <div
                                className={`flex items-center justify-center py-2 px-3 bg-backgroundPrimary hover:bg-primary rounded-md hover:text-white cursor-pointer ${part === item ? 'bg-primary text-white' : ''}`}
                                key={item}
                                onClick={() => {
                                    setTabActive(item)
                                }}
                            > {item === 1 ? 'Listening' : 'Reading'}</div>)}
                    </div>
                </div>
                <div className={"bg-base-100 rounded-xl px-4 pb-4 mt-4"}>
                    <h3 className={'!m-2 pt-2'}>Danh sách câu hỏi {part === 1 ? 'Listening' : 'Reading'}</h3>
                    <div className={'grid grid-cols-8 DSxl:grid-cols-5 gap-2'}>
                        {listQues.slice(startAndNumber[0], startAndNumber[1]).map((item, index) => <div
                            onClick={() => questionClick(index)}
                            className={'bg-base-200 p-2 text-sm flex items-center justify-center rounded-md cursor-pointer select-none ' + `${item ? 'active-ques' : ''}`}
                            key={index}>{index + 1 + startPartIndex[part - 1]}</div>)}
                    </div>
                </div>
                <ButtonPrimary title={'Nộp bài'} className={'w-full mt-4'}
                               handleClick={finishExam}/>
            </div>
        </div>
    );
}

export default PartComponent;
