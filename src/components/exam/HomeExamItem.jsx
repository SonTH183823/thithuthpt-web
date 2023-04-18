import React, {useState} from 'react';
import ExamTag from "@/components/exam/ExamTag";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {categoryTitleConfig} from "../../configs/configs";
import math from "../../assets/images/test/math.jpg"
import Image from "next/image";
import ExamInfo from "./ExamInfo"

function HomeExamItem({item, user = {}}) {
    // const favoritePosts = useSelector((state) => state.post.favoritePosts);
    const favoritePosts = true
    // const profile = useSelector((state) => state.auth.profile);
    const profile = {}
    const [isFavorite, setIsFavorite] = useState(null);
    const [showHeart, setShowHeart] = useState(true);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleFavorite = async (e) => {
        e.stopPropagation();
        if (profile.id) {
            setIsFavorite(!isFavorite)
            //     const res = await PostAPI.toggleFavorite({
            //         userId: profile.id,
            //         postId: item.id,
            //     });
            //     setIsFavorite(!isFavorite);
            //     if (isFavorite) {
            //         const array = favoritePosts.filter((i) => i.post.id !== item.id);
            //         dispatch(updateFavoritePosts(array));
            //     } else {
            //         let temp = [...favoritePosts];
            //         temp.push({ post: item, userFavorite: profile });
            //         dispatch(updateFavoritePosts(temp));
            //     }
            //     if (res.ok) {
            //         toast.success("Cập nhật thông tin thành công!", {
            //             position: "bottom-right",
            //             autoClose: 5000,
            //             hideProgressBar: false,
            //             closeOnClick: true,
            //             pauseOnHover: true,
            //             draggable: true,
            //             progress: undefined,
            //             theme: "colored",
            //         });
            //     } else {
            //         toast.error("Đã có lỗi xảy ra!", {
            //             position: "bottom-right",
            //             autoClose: 5000,
            //             hideProgressBar: false,
            //             closeOnClick: true,
            //             pauseOnHover: true,
            //             draggable: true,
            //             progress: undefined,
            //             theme: "colored",
            //         });
            //     }
        } else {
            const modal = document.getElementById("modal-require-login");
            if (modal) {
                modal.click();
            }
        }
    };
    const handleClick = () => {
        // router.push(`/post/${strToSlug(item.title)}-${item.id}`);
    };
    return (
        <div
            className="md:w-[372px] w-[360px] mx-3  box-border rounded-xl relative shrink-0 bg-base-100 cursor-pointer mb-2 box-shadow"
            onClick={handleClick}
        >
            <div className="relative w-full h-[300px]">
                <Image
                    // src={item.images[0]}
                    src={math}
                    alt="thumbnail image"
                    placeholder={"blur"}
                    // blurDataURL={item.images[0]}
                    blurDataURL={"https://ngocmeow.github.io/ava1.jpg"}
                    className={"rounded-tl-xl rounded-tr-xl"}
                />
                <ExamTag
                    tag={categoryTitleConfig[item.category || 1]}
                    category={item.category}
                />
                {showHeart && (
                    <div
                        className="cursor-pointer absolute top-2 right-1 p-2 rounded-full bg-slate-700 bg-opacity-50 h-[36px] w-[36px] flex items-center justify-center"
                        onClick={(e) => handleFavorite(e)}
                    >
                        {isFavorite ? (
                            <i className="fa-solid fa-heart text-[#f9595f] text-2xl"></i>
                        ) : (
                            <i className="fa-light fa-heart text-2xl text-white"></i>
                        )}
                    </div>
                )}
            </div>
            <ExamInfo item={item}/>
        </div>
    );
}

export default HomeExamItem;