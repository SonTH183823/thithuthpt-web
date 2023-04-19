import React, {useState} from 'react';
import TitleExamItem from "@/components/exam/TitleExamItem";
import {CharacteristicsItem, CharacteristicsItemIcon} from "@/components/characteristics/CharacteristicsItem";
import star from "@/assets/images/svg/star.svg";
import time from "@/assets/images/svg/time.svg";
import question from "@/assets/images/svg/question-number.svg";
import list_check from "@/assets/images/svg/list-check.svg";
import {kFormatter} from "../../utils/common";
import list_view from "@/assets/images/svg/list-view.svg";
import date from "@/assets/images/svg/calendar.svg";
import {formatDate} from "../../utils/moment";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import ModalReportPost from "@/components/modal/ModalReportPost";
import ModalShare from "@/components/modal/ModalShare";
import "react-tooltip/dist/react-tooltip.css";
import {Tooltip as ReactTooltip} from "react-tooltip";
import RadioWithoutValidate from "@/components/input/RadioWithoutValidate";
import ModalConfirmStartExam from "@/components/modal/ModalConfirmStartExam";

function DetailExam({i, isDoExam = false}) {
    const item = {
        tradingForm: 1,
        showTitle: true,
        price: 10232434,
        deposit: 12242354,
        createdAt: 1213445,
        title: 'Đề thi THPT Quốc gia năm 2021 môn Lịch sử Mã đề 301',
        category: 4
    }
    // const profile = useSelector((state) => state.auth.profile);
    const profile = {}
    const [isFavorite, setIsFavorite] = useState(null);
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
    const handleReport = () => {
        if (!profile.id) {
            const modal = document.getElementById("modal-report-post-id");
            if (modal) {
                modal.click();
            }
        } else {
            const modal = document.getElementById("modal-require-login-id");
            if (modal) {
                modal.click();
            }
        }
    };

    const handleShare = () => {
        const modal = document.getElementById("modal-share-id");
        if (modal) {
            modal.click();
        }
    };
    const startExam = () => {
        const modal = document.getElementById("modal-confirm-start-exam-id");
        if (modal) {
            modal.click();
        }
    };
    const enterExam = () => {

    }
    return (
        <div className={"p-4"}>
            <div className={"flex justify-between mb-2"}>
                <TitleExamItem
                    className={"font-bold text-info text-2xl flex items-center mb-2 cursor-pointer !m-0 !mr-4 hover:!text-black "}>
                    {item.title}
                </TitleExamItem>
                <div className={"flex flex-row space-x-1"}>
                    <div
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={'Yêu thích'}
                        className="cursor-pointer p-2 h-[36px] w-[36px] flex items-center justify-center"
                        onClick={(e) => handleFavorite(e)}
                    >
                        {isFavorite ? (
                            <i className="fa-solid fa-heart text-[#f9595f] text-2xl"></i>
                        ) : (
                            <i className="fa-light fa-heart text-2xl"></i>
                        )}
                    </div>
                    <div
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={'Chia sẻ'}
                        className="cursor-pointer p-2 h-[36px] w-[36px] flex items-center justify-center"
                        onClick={(e) => handleShare()}
                    >
                        <i className="fa-regular fa-share text-2xl"></i>
                    </div>
                    <div
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={'Báo cáo'}
                        className="cursor-pointer p-2 h-[36px] w-[36px] flex items-center justify-center"
                        onClick={(e) => handleReport()}
                    ><i className="fa-regular fa-flag text-xl"></i></div>
                </div>

            </div>

            <div className={'bg-base-200 rounded-xl p-3'}>
                <div className={'flex flex-row justify-between space-x-6 mb-3'}>
                    <CharacteristicsItem icon={star}>
                        5.0
                    </CharacteristicsItem>
                    <CharacteristicsItem icon={time}>
                        60 phút
                    </CharacteristicsItem>
                    <CharacteristicsItem icon={question}>
                        50 câu
                    </CharacteristicsItem>
                </div>
                <div className={'flex justify-between space-x-6'}>
                    <CharacteristicsItem icon={list_check}>
                        {kFormatter(1234)} lượt thi
                    </CharacteristicsItem>
                    <CharacteristicsItem icon={list_view}>
                        {kFormatter(12345)} lượt xem
                    </CharacteristicsItem>
                    <CharacteristicsItem icon={date}>
                        {formatDate(new Date())}
                    </CharacteristicsItem>
                </div>

            </div>
            {!isDoExam && <ButtonPrimary
                title="Bắt đầu làm bài"
                className="w-full mt-3"
                handleClick={() => startExam()}
            />}
            <ModalReportPost id={"modal-report-post"} postId={item.id}/>
            <ModalShare id={"modal-share-post"} title={item.title}/>
            <ReactTooltip id={'my-tooltip'}/>
            <ModalConfirmStartExam id={"modal-confirm-start-exam-id"} handleClick={() => enterExam()}/>
        </div>
    )
}

export default DetailExam;
