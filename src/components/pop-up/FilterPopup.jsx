import React, {useState} from "react";
import HeaderPopupFilter from "./HeaderPopupFilter";
import Collapse from "../common/Collapse";
import {levelConfig, subjectConfig,} from "configs/configs";
import ButtonPrimary from "../button/ButtonPrimary";
import {useRouter} from "next/router";
import ItemSelect from "@/components/filter/ItemSelect";
import InputRange from "react-input-range";
import eventEmitter from "../../utils/eventEmitter";

const FilterPopup = ({show, setShow}) => {
    const router = useRouter();
    const [subject, setSubject] = useState(null);
    const [level, setLevel] = useState(null);
    const [rate, setRate] = useState(null);
    const [maxNumQuestion, setMaxNumQuestion] = useState(1);
    const [timeToDo, setTimeToDo] = useState(0);

    const handleApply = () => {
        let filterParams = {};
        if ("subject" in router.query) {
            delete router.query.subject;
        }
        if ("rate" in router.query) {
            delete router.query.rate;
        }
        if ("level" in router.query) {
            delete router.query.level;
        }
        if ("maxques" in router.query) {
            delete router.query.maxques;
        }
        if ("time" in router.query) {
            delete router.query.time;
        }
        if ("keyword" in router.query) {
            filterParams.keyword = router.query.keyword;
            delete router.query.keyword;
        }
        filterParams.subject = subject;
        filterParams.rate = rate;
        filterParams.level = level;
        filterParams.maxques = maxNumQuestion;
        filterParams.time = timeToDo;
        const q = Object.fromEntries(
            Object.entries(filterParams).filter(([_, v]) => v)
        );
        let queryTemp = [];
        for (const key in q) {
            queryTemp.push(`${key}=${q[key]}`);
        }
        setShow(false);
        router.push(`/filter?${queryTemp.join("&")}`);
    };
    const deleteFilter = () => {
        setSubject(null)
        setLevel(null)
        setMaxNumQuestion(1)
        setTimeToDo(1)
        setRate(null)
        eventEmitter.emit('clearInputSearch')
    }
    return (
        <div
            className={`fixed bottom-0 left-0 right-0 w-full h-screen bg-base-100 transition-all duration-300 z-30 ${
                show ? "" : "translate-y-full"
            }`}
        >
            <HeaderPopupFilter setShow={setShow}/>
            <div className={"flex flex-col space-y-5 px-2 overflow-y-auto h-full pb-32"}>
                <Collapse title={"Môn học"}>
                    <ItemSelect checked={subject === subjectConfig['toan'].value} label={'Toán Học'}
                                handleSelect={() => {
                                    setSubject(subjectConfig['toan'].value)
                                }}/>
                    <ItemSelect checked={subject === subjectConfig['ly'].value} label={'Vật Lý'}
                                handleSelect={() => {
                                    setSubject(subjectConfig['ly'].value)
                                }}/>
                    <ItemSelect checked={subject === subjectConfig['hoa'].value} label={'Hóa học'}
                                handleSelect={() => {
                                    setSubject(subjectConfig['hoa'].value)
                                }}/>
                    <ItemSelect checked={subject === subjectConfig['sinh'].value} label={'Sinh Học'}
                                handleSelect={() => {
                                    setSubject(subjectConfig['sinh'].value)
                                }}/>
                    <ItemSelect checked={subject === subjectConfig['anh'].value} label={'Tiếng Anh'}
                                handleSelect={() => {
                                    setSubject(subjectConfig['anh'].value)
                                }}/>
                    <ItemSelect checked={subject === subjectConfig['su'].value} label={'Lịch Sử'}
                                handleSelect={() => {
                                    setSubject(subjectConfig['su'].value)
                                }}/>
                    <ItemSelect checked={subject === subjectConfig['dia'].value} label={'Địa Lý'}
                                handleSelect={() => {
                                    setSubject(subjectConfig['dia'].value)
                                }}/>
                    <ItemSelect checked={subject === subjectConfig['gdcd'].value} label={'GDCD'}
                                handleSelect={() => {
                                    setSubject(subjectConfig['gdcd'].value)
                                }}/>
                </Collapse>
                <Collapse title={"Độ khó"}>
                    <ItemSelect checked={level === levelConfig[0].value} label={'Cơ bản'} handleSelect={() => {
                        setLevel(levelConfig[0].value)
                    }}/>
                    <ItemSelect checked={level === levelConfig[1].value} label={'Trung bình'}
                                handleSelect={() => {
                                    setLevel(levelConfig[1].value)
                                }}/>
                    <ItemSelect checked={level === levelConfig[2].value} label={'Nâng cao'}
                                handleSelect={() => {
                                    setLevel(levelConfig[2].value)
                                }}/>
                    <ItemSelect checked={level === levelConfig[3].value} label={'Khó'} handleSelect={() => {
                        setLevel(levelConfig[3].value)
                    }}/>
                </Collapse>
                <Collapse title={"Đánh giá"}>
                    <ItemSelect checked={rate === 5} label={'⭐⭐⭐⭐⭐'} hasIcon={true} handleSelect={() => {
                        setRate(5)
                    }}/>
                    <ItemSelect checked={rate === 4} label={'⭐⭐⭐⭐'} hasIcon={true} handleSelect={() => {
                        setRate(4)
                    }}/>
                    <ItemSelect checked={rate === 3} label={'⭐⭐⭐'} hasIcon={true} handleSelect={() => {
                        setRate(3)
                    }}/>
                    <ItemSelect checked={rate === 2} label={'⭐⭐'} hasIcon={true} handleSelect={() => {
                        setRate(2)
                    }}/>
                    <ItemSelect checked={rate === 1} label={'⭐'} hasIcon={true} handleSelect={() => {
                        setRate(1)
                    }}/>
                </Collapse>
                <Collapse title={'Số lượng câu hỏi tối đa'}>
                    <div
                        className={'text-base text-center border-b-[1px] border-b-gray-300 pb-3 select-none px-3'}>
                        <div className={'mb-3'}>1 câu ~ 500 câu</div>
                        <InputRange
                            maxValue={500}
                            minValue={1}
                            value={maxNumQuestion}
                            onChange={value => setMaxNumQuestion(value)}/>
                        <div
                            className={'mt-3'}>{maxNumQuestion === 1 ? 'Không giới hạn' : `${maxNumQuestion} câu`}</div>
                    </div>
                </Collapse>
                <Collapse title={'Thời gian làm bài tối đa'}>
                    <div
                        className={'text-base text-center border-b-[1px] border-b-gray-300 pb-3 select-none px-3'}>
                        <div className={'mb-3'}>0 phút ~ 360 phút</div>
                        <InputRange
                            maxValue={360}
                            minValue={0}
                            value={timeToDo}
                            onChange={value => setTimeToDo(value)}/>
                        <div className={'mt-3'}>{timeToDo === 0 ? 'Không giới hạn' : `${timeToDo} phút`}</div>
                    </div>
                </Collapse>
            </div>
            <div
                className="bg-base-100 fixed bottom-0 pb-5 left-1/2 -translate-x-2/4 w-full flex items-center space-x-3 px-2">
                <ButtonPrimary
                    title="Áp dụng"
                    className="w-full"
                    handleClick={handleApply}
                />
                <ButtonPrimary title="Đặt lại" className="w-full" handleClick={deleteFilter} isPrimary={false}/>
            </div>
        </div>
    );
};

export default FilterPopup;
