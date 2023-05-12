import React, {useEffect, useState} from "react";
import TitleSection from "../common/TitleSection";
import Image from "next/image";
import about from "@/assets/images/about.png";
import check from "@/assets/images/icons/check-mark.svg";
import {kFormatter} from "../../utils/common";
import ButtonSecondary from "@/components/button/ButtonSecondary";
import ButtonPrimary from "@/components/button/ButtonPrimary";

export default function AboutSection() {
    const list = ['Tìm kiếm đề thi, bài kiểm tra trắc nghiệm, đề cương ôn tập tự luyện', 'Làm bài thi online và đánh giá kết quả', 'Lịch sử làm bài, thảo luận câu hỏi', 'Đề thi luôn được cập nhật nhanh chóng, mới nhất', 'Tạo đề thi tự luyện ngẫu nhiên trong kho đề của chúng tôi']
    // const [info, setInfo] = useState();

    // useEffect(() => {
    //   (async () => {
    //     try {
    //       const res = await statisticAPI.getInfo();
    //       if (res) {
    //         setInfo(res);
    //       }
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   })();
    // }, []);
    const genDesUI = (text) => {
        return (<div className={'text-white w-full flex flex-row items-center space-x-1'} key={text}>
            <Image src={check} alt={""} className={"object-cover"} height={16} width={24}/>
            <span>{text}</span>
        </div>)
    }
    return (<div className="bg-backgroundSecondary">
        <div className="container md:grid grid-cols-2 gap-x-5 px-4 sm:px-0">
            <div className="flex items-center justify-center">
                <div className="relative md:w-[386px] w-[193px] md:h-[380px] h-[190px]">
                    <Image
                        src={about}
                        layout={"fill"}
                        className={"object-cover"}
                        alt="img-question"
                    />
                </div>
            </div>
            <div className="flex items-center flex-col space-y-4 md:py-8 pb-8 lg:px-4 ">
                {/*<TitleSection title={"Tại sao chọn chúng tôi"} isColorWhite={true}/>*/}
                <div className="lg:text-4xl text-xl font-bold text-white flex justify-center flex-col items-center">
                    <div className="pb-2">thithuthpt có gì?</div>
                    <div className="bg-white mr-2 h-[4px] w-[100px]"></div>
                </div>
                <p className="text-white py-2 leading-8 text-justify">
                    THITHUTHPT cung cấp nền tảng thi thử online các môn học một cách tiện lợi và dễ dàng.
                    Kết quả và đánh giá sẽ có ngay sau mỗi đề thi được hoàn thành giúp bạn tăng hiệu quả ôn luyện.
                </p>
                {list.map(item => genDesUI(item))}
                <div className="flex items-center justify-evenly w-full text-white">
                    <div className="flex flex-col items-center">
                                <span className="font-bold lg:text-3xl text-xl">
                                  {'112'}
                                </span>
                        <div className="text-white font-bold lg:text-xl py-1">
                            đề thi
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                    <span className="font-bold lg:text-3xl text-xl ">
                      {kFormatter(2345)}
                    </span>
                        <div className="text-white font-bold lg:text-xl py-1">
                            câu hỏi
                        </div>
                    </div>
                    {/*<button className={'px-5 py-2 rounded-md bg-white hover:bg-backgroundPrimary text-primary font-semibold'}>Tham gia ngay</button>*/}
                </div>
            </div>
        </div>
    </div>);
}
