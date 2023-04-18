import InteractiveContainer from "@/components/interactive/InteractiveContainer";
import TitleSection from "@/components/common/TitleSection";
import React, {Fragment, useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation} from "swiper";
import ModalShare from "@/components/modal/ModalShare";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import HomeExamItem from "@/components/exam/HomeExamItem";
import DetailExam from "@/components/exam/DetailExam";
import StarRating from "@/components/feedback/StarRating";
import ButtonPrimary from "@/components/button/ButtonPrimary";

export default function ExamDetail({
                                       exam = {
                                           id: 1,
                                           title: 'Bai thi mau'
                                       }
                                   }) {
    // const profile = useSelector((state) => state.auth.profile);
    const router = useRouter();
    const [isFavorite, setIsFavorite] = useState(null);
    // const favoritePosts = useSelector((state) => state.post.favoritePosts);
    const favoritePosts = []
    const [relatedPosts, setRelatedPosts] = useState([]);
    const dispatch = useDispatch();
    const [rating, setRating] = useState(0);
    const changeRating = (newRating) => {
        setRating(newRating);
    };
    const listTypeExam = [
        {
            name: 'Bất Phương Trình',
            numQues: 3
        },
        {
            name: 'Cấp Số Cộng - Số Nhân',
            numQues: 3
        },
        {
            name: 'Hàm Số - Giới Hạn',
            numQues: 3
        },
        {
            name: 'Hàm Số - Đồ Thị',
            numQues: 3
        },
        {
            name: 'Hình Học Giải Tích',
            numQues: 3
        },
        {
            name: 'Hình Học Không Gian',
            numQues: 3
        },
        {
            name: 'Loại Khác',
            numQues: 3
        },
        {
            name: 'Mũ - Lũy Thừa',
            numQues: 3
        },
        {
            name: 'Số Phức',
            numQues: 3
        },
        {
            name: 'Tích Phân - Đạo Hàm',
            numQues: 3
        },
        {
            name: 'Tổ Hợp - Xác Suất',
            numQues: 3
        },
    ]

    // useEffect(() => {
    //     if (favoritePosts && post.id) {
    //         const p = favoritePosts.find((i) => i.post.id === post.id);
    //         if (p) {
    //             setIsFavorite(true);
    //         }
    //     }
    // }, [favoritePosts]);

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             if (post.id) {
    //                 const { province, district, ward, category, tradingForm } = post;
    //                 const res = await PostAPI.getRelatedPost({
    //                     id: post.id,
    //                     data: { province, district, category, tradingForm },
    //                 });
    //                 if (res) {
    //                     setRelatedPosts(res.relatedPosts);
    //                 }
    //             }
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     })();
    // }, []);
    const handleFilterProvince = () => {
        // router.push(`/filter?address=${post.province}`);
    };

    const handleFilterDistrict = () => {
        // router.push(`/filter?address=${post.province},${post.district}`);
    };

    const handleFilterWard = () => {
        // router.push(
        //     `/filter?address=${post.province},${post.district},${post.ward}`
        // );
    };

    const handleFilterCategory = () => {
        // router.push(`/filter?category=${post.category}`);
    };

    const handleReport = () => {
        // if (profile.id) {
        //     const modal = document.getElementById("modal-report-post-id");
        //     if (modal) {
        //         modal.click();
        //     }
        // } else {
        //     const modal = document.getElementById("modal-require-login-id");
        //     if (modal) {
        //         modal.click();
        //     }
        // }
    };

    const handleShare = () => {
        const modal = document.getElementById("modal-share-id");
        if (modal) {
            modal.click();
        }
    };

    const handleFavorite = async () => {
        if (profile.id) {
            const res = await PostAPI.toggleFavorite({
                userId: profile.id,
                postId: post.id,
            });
            setIsFavorite(!isFavorite);
            if (isFavorite) {
                const array = favoritePosts.filter((i) => i.post.id !== post.id);
                dispatch(updateFavoritePosts(array));
            } else {
                let temp = [...favoritePosts];
                temp.push({post: post, userFavorite: profile});
                dispatch(updateFavoritePosts(temp));
            }
            if (res.ok) {
                toast.success("Cập nhật thông tin thành công!", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                toast.error("Đã có lỗi xảy ra!", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        } else {
            const modal = document.getElementById("modal-require-login");
            if (modal) {
                modal.click();
            }
        }
    };
    return (
        <Fragment>
            {exam.id ? (
                <div className={"bg-base-200"}>
                    <div className="container mx-auto py-8 padding-mobile">
                        <div className="text-sm breadcrumbs pb-4">
                            <ul>
                                <li className="cursor-pointer" onClick={handleFilterCategory}>
                                    categoryTitleConfig[post.category]
                                </li>
                                <li onClick={handleFilterProvince} className="cursor-pointer">
                                    provincesConfig[post.province]
                                </li>
                                <li className="cursor-pointer" onClick={handleFilterDistrict}>
                                    districtsConfig[post.district]
                                </li>
                                <li className="cursor-pointer" onClick={handleFilterWard}>
                                    wardsConfig[post.ward]
                                </li>
                            </ul>
                        </div>
                        <div className="lg:grid grid-cols-3 lg:space-x-5">
                            <div className="col-span-2 relative">
                                <div className={"bg-base-100 rounded-xl "}>
                                    <DetailExam/>
                                </div>
                                <div className={"bg-base-100 p-4 rounded-xl mt-4"}>
                                    <h3>Phân loại câu hỏi trong đề thi</h3>
                                    <div className="grid grid-cols-6 gap-4 font-bold border-b-primary border-b-[1px]">
                                        <div className="px-4 py-2 col-span-1 text-center">#</div>
                                        <div className="px-4 py-2 col-span-3">Dạng câu hỏi</div>
                                        <div className="px-4 py-2 col-span-2 text-center">Số câu hỏi</div>
                                    </div>
                                    {listTypeExam.map((item, index) => (
                                        <div className="grid grid-cols-6 gap-4 border-b-primary border-b-[1px]">
                                            <div className="px-4 py-2 col-span-1 text-center">{index + 1}</div>
                                            <div className="px-4 py-2 col-span-3">{item.name}</div>
                                            <div className="px-4 py-2 col-span-2 text-center">{item.numQues}</div>
                                        </div>
                                    ))}
                                    <div className="grid grid-cols-6 gap-4 font-bold border-b-primary border-b-[.5px]">
                                        <div className="px-4 py-2 col-span-1 text-center"></div>
                                        <div className="px-4 py-2 col-span-3">Tổng số</div>
                                        <div className="px-4 py-2 col-span-2 text-center">50</div>
                                    </div>
                                </div>
                                <div className={"bg-base-100 p-4 rounded-xl mt-4"}>
                                    <h3 className="text-lg font-bold">
                                        Đánh giá
                                    </h3>
                                    <div className={'flex flex-row justify-between'}>
                                        <StarRating rating={rating} changeRating={changeRating}/>
                                        <ButtonPrimary
                                            title="Gửi đánh giá"
                                            className="float-right px-2"
                                        />
                                    </div>
                                </div>
                                <div className={"bg-base-100 p-4 rounded-xl mt-4"}>
                                    <InteractiveContainer postId={exam.id}/>
                                </div>
                            </div>
                            <div className="hidden col-span-1 lg:flex flex-row gap-y-5">
                                Danh sach bang xep hang
                                Bai thi tuong tu
                            </div>
                        </div>
                        <div className="py-4">
                            <TitleSection title="Xem thêm các tin đăng tương tự"/>
                            <div className="flex items-center gap-x-5 py-4">
                                {relatedPosts.length ? (
                                    <Fragment>
                                        <Swiper
                                            slidesPerView={1}
                                            spaceBetween={10}
                                            modules={[Navigation, Autoplay]}
                                            breakpoints={{
                                                640: {
                                                    slidesPerView: 1,
                                                    spaceBetween: 10,
                                                },
                                                768: {
                                                    slidesPerView: 2,
                                                    spaceBetween: 5,
                                                },
                                                1024: {
                                                    slidesPerView: 3,
                                                    spaceBetween: 10,
                                                },
                                            }}
                                        >
                                            {relatedPosts.length > 0 &&
                                                relatedPosts.map((item) => (
                                                    <SwiperSlide key={item.id}>
                                                        <HomeExamItem item={item} key={item.id}/>
                                                    </SwiperSlide>
                                                ))}
                                        </Swiper>
                                    </Fragment>
                                ) : (
                                    <div className="text-center w-full">
                                        Không có tin đăng tương tự nào.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/*<ModalReportPost id={"modal-report-post"} postId={post.id} />*/}
                    <ModalShare id={"modal-share-post"} title={exam.title}/>
                </div>
            ) : null}
        </Fragment>
    );
}