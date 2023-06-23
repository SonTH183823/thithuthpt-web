import {Fragment} from "react";
import AboutSection from "@/components/about/AboutSection";
import PrimaryBanner from "@/components/banner/PrimaryBanner";
import HomeExamList from "@/components/exam/HomeExamList";
import NewHomeSection from "@/components/home/news/NewHomeSection";
import FeedbackSection from "@/components/feedback/FeedbackSection";
import FeatureSection from "@/components/filter/FilterSection";

export default function Home() {
    return (
        <Fragment>
            <div className="mx-auto bg-base-200">
                <PrimaryBanner/>
                <FeatureSection />
                <div className="container">
                    <HomeExamList title={"ĐỀ THI NỔI BẬT"}/>
                    {/*<HomeExamList title={"MÔN TOÁN"} category={2}/>*/}
                    {/*<HomeExamList title={"MÔN LÝ"} category={3}/>*/}
                    {/*<HomeExamList title={"HÓA HỌC"} category={4}/>*/}
                </div>
                {/*<div className="bg-white">*/}
                {/*    <div className={'container'}>*/}
                {/*        <HomeExamList title={"TÀI LIỆU ÔN TẬP"} category={4}/>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <NewHomeSection/>
                <AboutSection/>
                <FeedbackSection/>
            </div>
        </Fragment>
    )
}
