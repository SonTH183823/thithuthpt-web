import PrimaryBanner from "@/components/banner/PrimaryBanner";
import FeatureSection from "@/components/filter/FilterSection";
import {
    xapSepConfig,
    subjectConfig,
    levelConfig
} from "configs/configs";
import {useRouter} from "next/router";
import React, {Fragment, useEffect, useState} from "react";
import ButtonSeeMore from "@/components/button/ButtonSeeMore";
import PostSekeleton from "@/components/Sekeleton/PostSekeleton";
import HomeExamItem from "@/components/exam/HomeExamItem";
import Collapse from "@/components/common/Collapse";
import ItemSelect from "@/components/filter/ItemSelect";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import InputRange from "react-input-range";
import Select from "react-select";
import FilterButton from "@/components/filter/FilterButton";
import {ExamAPI} from "../../apis/exam";
import eventEmitter from "../../utils/eventEmitter";

const FilterPage = () => {
    const router = useRouter();
    const [exams, setExams] = useState([1, 2, 3, 4, 5, 6]);
    const [total, setTotal] = useState(null);
    const [showButtonLoadMore, setShowButtonLoadMore] = useState(null);
    const [limit, setLimit] = useState(6);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadMore, setLoadMore] = useState(false);

    const [maxNumQuestion, setMaxNumQuestion] = useState(1);
    const [timeToDo, setTimeToDo] = useState(0);
    const [subject, setSubject] = useState(null);
    const [level, setLevel] = useState(null);
    const [rate, setRate] = useState(null);
    const [sort, setSort] = useState(xapSepConfig[0]);


    const getExams = async (offsetProp) => {
        try {
            setLoading(true);
            const res = await ExamAPI.filterExam({
                ...router.query,
                offset: offsetProp,
                limit,
                active: 1,
            });
            if (res) {
                if (offsetProp === 0) {
                    setTotal(res.total);
                    setExams([...res.exams]);
                } else {
                    setExams((exams) => [...exams, ...res.exams]);
                }
            } else {
                setExams([]);
                setTotal(0);
            }
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    };

    useEffect(() => {
        (async () => {
            await getExams(0);
        })();
    }, [router.query]);

    useEffect(() => {
        if (sort.value === xapSepConfig[1].value) {
            let queryTemp = [];
            for (const key in router.query) {
                queryTemp.push(`${key}=${router.query[key]}`);
            }
            router.push(`/filter?${queryTemp.join("&")}&outstanding=1`);
        } else {
            if (Object.keys(router.query).length && !("keyword" in router.query)) {
                if ("outstanding" in router.query) {
                    delete router.query.outstanding;
                }
                let queryTemp = [];
                for (const key in router.query) {
                    queryTemp.push(`${key}=${router.query[key]}`);
                }
                router.push(`/filter?${queryTemp.join("&")}`);
            }
        }
    }, [sort.value]);

    useEffect(() => {
        if (total && total > 0 && exams.length < total) {
            setShowButtonLoadMore(true);
        } else {
            setShowButtonLoadMore(false);
        }
    }, [exams.length]);

    const handleLoadMore = () => {
        setLoadMore(true);
        getExams(offset + limit);
        setOffset(offset + limit);
        setLoadMore(false);
    };
    const deleteFilter = () => {
        setSubject(null)
        setLevel(null)
        setMaxNumQuestion(0)
        setTimeToDo(0)
        setRate(null)
        eventEmitter.emit('clearInputSearch')
        router.push("/filter")
    }
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
        router.push(`/filter?${queryTemp.join("&")}`);
    };
    return (
        <div className={'relative bg-base-200'}>
            {/*<PrimaryBanner/>*/}
            <div className=" container mx-auto">
                <div className={'grid lg:grid-cols-12 grid-col-1 gap-1.5 md:gap-3 py-3'}>
                    <div className={'hidden lg:block h-fit col-span-3 bg-white shadow-xl p-3 rounded-lg'}>
                        <div className={'flex items-center justify-between cursor-pointer pb-2'}>
                            <div className={'font-bold pb-1'}>Tìm kiếm</div>
                            <div className={'text-primary text-sm pb-1 hover:opacity-80'}
                                 onClick={deleteFilter}>Xóa bộ lọc
                            </div>
                        </div>
                        <FeatureSection isSmall={true}/>
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
                        <ButtonPrimary title={'Áp dụng bộ lọc'} isPrimary={true} className={'w-full mt-3'}
                                       handleClick={handleApply}/>
                    </div>
                    <div className={'col-span-9'}>
                        <div className={'flex lg:hidden w-full px-3'}>
                            <FeatureSection isSmall={true}/>
                        </div>
                        <div
                            className={'shadow-xl mx-3 flex justify-between bg-white px-3 rounded-md items-center text-sm md:text-base'}>
                            <div>Tìm thấy <span className={'font-bold'}>69</span> kết quả</div>
                            <div className={'flex items-center space-x-2'}>
                                <div className={'font-semibold'}>Sắp xếp</div>
                                <Select
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            borderRadius: "5px",
                                            borderColor: "#e5e7eb",
                                            margin: "8px 0",
                                            width: "130px",
                                        }),
                                    }}
                                    options={xapSepConfig}
                                    onChange={(option) => {
                                        setSort(option)
                                    }}
                                    value={sort}
                                />
                            </div>
                        </div>
                        {exams.length > 0 ? (
                            <Fragment>
                                <div className="my-4 grid md:grid-cols-2 grid-col-1 gap-1 md:gap-3">
                                    {loading ? (
                                        <Fragment>
                                            <PostSekeleton isSearch={true}/>
                                            <PostSekeleton isSearch={true}/>
                                            <PostSekeleton isSearch={true}/>
                                            <PostSekeleton isSearch={true}/>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            {exams.map((post) => (
                                                <HomeExamItem key={post.id} item={post} isSearch={true}/>
                                            ))}

                                            {!loadMore && (
                                                <Fragment>
                                                    <PostSekeleton isSearch={true}/>
                                                    <PostSekeleton isSearch={true}/>
                                                </Fragment>
                                            )}
                                        </Fragment>
                                    )}
                                </div>
                                <div className="text-center pb-4">
                                    {!loading && (
                                        <span className="text-gray-500">Đang hiển thị {exams.length} / {total || 69} kết quả.</span>)}
                                </div>

                                {showButtonLoadMore && <div className="flex justify-center pb-8">
                                    <ButtonSeeMore handleClick={handleLoadMore}/>
                                </div>}
                            </Fragment>
                        ) : (
                            <div className="p-16 text-center font-bold">
                                Không tìm thấy kết quả!
                            </div>
                        )}
                    </div>
                </div>
                {(loading || loadMore) ? <></> : <FilterButton/>}
            </div>
        </div>
    );
};
export default FilterPage;

