import * as React from "react";
import {formatDate} from "utils/moment";
import Avatar from "../user/Avatar";
import StarRating from "./StarRating";

export default function FeedbackItem({isBackground, feedback1}) {
    const feedback = {
        feedbacker: {
            avatar: 'https://img.freepik.com/photos-gratuite/plantes-romarin-dans-nature_1150-35514.jpg?w=1480&t=st=1682144634~exp=1682145234~hmac=0cd8a09ff0701bf4ea075e1509326dd77e8b8f460006473e002d8b678310375d',
            displayName: 'Nguyễn Văn Mười'
        },
        star: 4.6,
        feedback: 'Chỉ sau 4 tháng kể từ đầu năm 2023, vốn hóa thị trường của NVIDIA đã tăng chóng mặt, tất cả là nhờ bùng nổ nhu cầu về AI. Ở thời điểm bài viết, vốn hóa thị trường NVIDIA là 666.67 tỉ USD, mức tăng 83.06% so với đầu năm, trong khi đó đỉnh điểm là 1/4/2023, vốn hóa đạt mức 692.2 tỉ USD, tương ứng tăng 90.07% so với mốc 364.18 tỉ USD vào ngày cuối cùng năm 2022.'
    }
    return (
        <div
            className={`mr-4 box-shadow sm:w-[500px] w-[280px] sm:h-[210px] h-[395px] rounded-lg text-center sm:flex items-start space-x-5 justify-center p-4 ${
                !isBackground ? "bg-base-100" : "bg-primary"
            }`}
        >
            <div className="flex flex-col items-center">
                <div className="relative w-fit">
                    <Avatar sizeAvatar={"w-20"} avatar={feedback.feedbacker.avatar}/>
                    <div
                        className={`h-5 w-5 rounded-full absolute bottom-2 right-1 flex items-center justify-center border border-white ${
                            !isBackground ? " bg-secondary" : "bg-primary"
                        }`}
                    >
                        <i className="fa-solid fa-quote-right text-white text-xs"></i>
                    </div>
                </div>
                <span className="font-bold">{feedback.feedbacker.displayName}</span>
            </div>
            <div className="flex-1">
                <div className="pt-2 flex flex-col sm:items-start items-center">
                    <StarRating
                        rating={feedback.star}
                        starDimension="24px"
                        starSpacing="4px"
                    />
                </div>
                <div
                    className={`feedback-item sm:max-h-[120px] max-h-[200px] overflow-y-auto my-4 block text-justify pr-4 ${
                        isBackground ? "text-backgroundGray" : "text-info"
                    }`}
                >
                    {feedback.feedback}
                </div>
            </div>
        </div>
    );
}
