import InteractiveContainer from "@/components/interactive/InteractiveContainer";
import TitleSection from "@/components/common/TitleSection";
import React, {Fragment, useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation} from "swiper";
import ModalShare from "@/components/modal/ModalShare";
import { toast } from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import HomeExamItem from "@/components/exam/HomeExamItem";
export default function ExamDetail ({exam = {
    id: 1,
    title: 'Bai thi mau'
}}) {
    // const profile = useSelector((state) => state.auth.profile);
    const router = useRouter();
    const [isFavorite, setIsFavorite] = useState(null);
    // const favoritePosts = useSelector((state) => state.post.favoritePosts);
    const favoritePosts = []
    const [relatedPosts, setRelatedPosts] = useState([]);
    const dispatch = useDispatch();

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
                temp.push({ post: post, userFavorite: profile });
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
                <div className={"bg-base-100"}>
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
                                thong tin de thi
                                mo ta
                                cac phan trong de thi
                            </div>
                            <div className="hidden col-span-1 lg:flex flex-col gap-y-5">
                                Danh sach bang xep hang
                                Bai thi tuong tu
                            </div>
                        </div>
                        <div className="py-4">
                            <TitleSection title="Xem thêm các tin đăng tương tự" />
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
                                                        <HomeExamItem item={item} key={item.id} />
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
                        <InteractiveContainer postId={ exam.id} />
                    </div>
                    {/*<ModalReportPost id={"modal-report-post"} postId={post.id} />*/}
                    <ModalShare id={"modal-share-post"} title={exam.title} />
                </div>
            ) : null}
        </Fragment>
    );
}