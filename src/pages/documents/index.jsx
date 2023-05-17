import React, {Fragment, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {
    categoryConfig,
    districtsConfig, levelConfig,
    provincesConfig,
    subjectConfig,
    tradingFormConfig,
    xapSepConfig
} from "../../configs/configs";
import {ExamAPI} from "../../apis/exam";
import {formatPrice} from "../../utils/common";
import FeatureSection from "@/components/filter/FilterSection";
import Collapse from "@/components/common/Collapse";
import ItemSelect from "@/components/filter/ItemSelect";
import InputRange from "react-input-range";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import Select from "react-select";
import PostSekeleton from "@/components/Sekeleton/PostSekeleton";
import HomeExamItem from "@/components/exam/HomeExamItem";
import ButtonSeeMore from "@/components/button/ButtonSeeMore";
import FilterButton from "@/components/filter/FilterButton";

function Documents(props) {
    const router = useRouter();
    const [criteriaFilter, setCriteriaFilter] = useState([]);
    const [exams, setExams] = useState([1, 2, 3, 4, 5, 6]);
    const [total, setTotal] = useState(null);
    const [showButtonLoadMore, setShowButtonLoadMore] = useState(null);
    const [limit, setLimit] = useState(6);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadMore, setLoadMore] = useState(false);
    const [tradingForm, setTradingForm] = useState(null);
    const [checked, setChecked] = useState(false);
    const [maxNumQuestion, setMaxNumQuestion] = useState(1);
    const [timeToDo, setTimeToDo] = useState(0);
    const [subject, setSubject] = useState(null);
    const [level, setLevel] = useState(null);
    const [sapXep, setSapXep] = useState(xapSepConfig[0]);


    const getExams = async (offsetProp) => {
        try {
            setLoading(true);
            const res = await ExamAPI.filterExam({
                ...router.query,
                offset: offsetProp,
                limit,
                status: 1,
                isActive: 1,
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
            if (Object.keys(router.query).length) {
                let categoryValue = [];
                let priceRangeValue = {};
                let areaRangeValue = {};
                let addressValue = {};
                let tradingFormValue = "";
                let furnitureValue = "";
                let hasVideoValue = "";
                if (Object.keys(router.query).length) {
                    const {
                        category,
                        priceRange,
                        areaRange,
                        address,
                        tradingForm,
                        keyword,
                        isFurniture,
                        hasVideo,
                    } = router.query;
                    if (category) {
                        category.split(",").forEach((item) => {
                            categoryValue.push(categoryConfig.find((i) => i.id === +item));
                        });
                    }

                    if (priceRange) {
                        const priceRangeArray = priceRange.split(",");
                        priceRangeValue = {
                            title: `Khoảng giá ${formatPrice(
                                priceRangeArray[0]
                            )}đ - ${formatPrice(priceRangeArray[1])}đ`,
                        };
                    }

                    if (areaRange) {
                        const areaRangeArray = areaRange.split(",");
                        areaRangeValue = {
                            title: `Diện tích ${areaRangeArray[0]}m2 - ${areaRangeArray[1]}m2`,
                        };
                    }
                    if (address) {
                        const addressArray = address.split(",");
                        addressValue = {
                            title: `Vị trí ${provincesConfig[addressArray[0]]}${
                                addressArray[1]
                                    ? ", " +
                                    `${districtsConfig[addressArray[1]]}${
                                        addressArray[2] ? ", " + wardsConfig[addressArray[2]] : ""
                                    }`
                                    : ""
                            }`,
                        };
                    }

                    if (tradingForm) {
                        if (tradingForm == tradingFormConfig["BUY_SELL"]) {
                            tradingFormValue = {
                                title: `Hình thức Bán`,
                            };
                        } else if (tradingForm == tradingFormConfig["FOR_RENTAL"]) {
                            tradingFormValue = {
                                title: `Hình thức Cho thuê`,
                            };
                        } else if (tradingForm == tradingFormConfig["ROOM_MATE"]) {
                            tradingFormValue = {
                                title: `Hình thức Tìm bạn ở ghép`,
                            };
                        } else {
                            tradingFormValue = {
                                title: `Hình thức Cần thuê`,
                            };
                        }
                    }
                    if (router.query.isFurniture) {
                        if (+isFurniture == furnitueConfig["NONE"]) {
                            furnitureValue = {
                                title: `Không có nội thất`,
                            };
                        } else if (+router.query.isFurnitue == furnitueConfig["BASIC"]) {
                            furnitureValue = {
                                title: `Nội thất cơ bản`,
                            };
                        } else {
                            furnitureValue = {
                                title: `Nội thất đầy đủ`,
                            };
                        }
                    }

                    if (hasVideo) {
                        if (+hasVideo == hasVideoConfig["NONE"]) {
                            hasVideoValue = {
                                title: `Tin không video`,
                            };
                        } else if (+hasVideo == hasVideoConfig["HAS_VIDEO"]) {
                            hasVideoValue = {
                                title: `Tin có video`,
                            };
                        } else {
                            hasVideoValue = {
                                title: `Tin có hoặc không có video`,
                            };
                        }
                    }
                }
                setCriteriaFilter([
                    tradingFormValue,
                    ...categoryValue,
                    addressValue,
                    priceRangeValue,
                    areaRangeValue,
                    furnitureValue,
                    hasVideoValue,
                ]);

                getExams(0);
            }
        })();
    }, [router.query]);

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
    const handleDeleteFilterLabel = (item) => {
        let {category} = router.query;

        if (item.title.includes("Khoảng giá")) {
            delete router.query.priceRange;
        } else if (item.title.includes("Diện tích")) {
            delete router.query.areaRange;
        } else if (item.title.includes("Vị trí")) {
            delete router.query.address;
        } else if (item.title.includes("Nội thất")) {
            delete router.query.isFurniture;
        } else if (item.title.includes("video")) {
            delete router.query.hasVideo;
        } else if (item.title.includes("Hình thức")) {
            delete router.query.tradingForm;
        } else if (category.includes(item.id)) {
            const categoryTemp = category
                .split(",")
                .filter((i) => i !== item.id.toString())
                .join(",");

            if (categoryTemp.length) {
                router.query.category = categoryTemp;
            } else {
                delete router.query.category;
            }
        }
        if (!Object.keys(router.query).length) {
            router.push("/");
        } else {
            let queryTemp = [];
            for (const key in router.query) {
                queryTemp.push(`${key}=${router.query[key]}`);
            }
            router.push(`/filter?${queryTemp.join("&")}`);
        }
    };
    const handleSelectTradingForm = (e) => {
        setTradingForm(e.target.value);
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
                                 onClick={() => router.push("/filter")}>Xóa bộ lọc
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
                            <ItemSelect checked={checked} label={'⭐⭐⭐⭐⭐'} hasIcon={true} handleSelect={() => {
                                setSubject(subjectConfig['toan'].value)
                            }}/>
                            <ItemSelect checked={checked} label={'⭐⭐⭐⭐'} hasIcon={true} handleSelect={() => {
                                setSubject(subjectConfig['toan'].value)
                            }}/>
                            <ItemSelect checked={checked} label={'⭐⭐⭐'} hasIcon={true} handleSelect={() => {
                                setSubject(subjectConfig['toan'].value)
                            }}/>
                            <ItemSelect checked={checked} label={'⭐⭐'} hasIcon={true} handleSelect={() => {
                                setSubject(subjectConfig['toan'].value)
                            }}/>
                            <ItemSelect checked={checked} label={'⭐'} hasIcon={true} handleSelect={() => {
                                setSubject(subjectConfig['toan'].value)
                            }}/>
                            <ItemSelect checked={checked} label={'Không có'} handleSelect={() => {
                                setSubject(subjectConfig['toan'].value)
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
                        <ButtonPrimary title={'Áp dụng bộ lọc'} isPrimary={true} className={'w-full mt-3'}/>
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
                                        setSapXep(option)
                                    }}
                                    value={sapXep}
                                />
                            </div>
                        </div>
                        {exams.length > 0 ? (
                            <Fragment>
                                <div className="my-4 grid md:grid-cols-2 grid-col-1 gap-1 md:gap-3">
                                    {loading ? (
                                        <Fragment>
                                            <PostSekeleton isSearch={true}></PostSekeleton>
                                            <PostSekeleton isSearch={true}></PostSekeleton>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            {exams.map((post) => (
                                                <HomeExamItem key={post.id} item={post} isSearch={true}/>
                                            ))}

                                            {!loadMore && (
                                                <Fragment>
                                                    <PostSekeleton isSearch={true}></PostSekeleton>
                                                    <PostSekeleton isSearch={true}></PostSekeleton>
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
                <FilterButton/>
                {/*<FeatureSection />*/}
            </div>
        </div>
    );
}

export default Documents;
