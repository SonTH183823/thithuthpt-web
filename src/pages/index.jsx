import {Fragment} from "react";
import AboutSection from "@/components/about/AboutSection";
import PrimaryBanner from "@/components/banner/PrimaryBanner";
import HomeExamList from "@/components/exam/HomeExamList";
import NewHomeSection from "@/components/home/news/NewHomeSection";
import FeedbackSection from "@/components/feedback/FeedbackSection";
import SearchSection from "@/components/home/SearchSection";

export default function Home() {
  return (
    <Fragment>
      <div className="mx-auto bg-base-200">
        <PrimaryBanner/>
        <SearchSection/>
        <HomeExamList title={"ĐỀ THI NỔI BẬT"}/>
        <div className="bg-white">
          <HomeExamList title={"TÀI LIỆU ÔN TẬP"} isDoc={true}/>
        </div>
        <NewHomeSection/>
        <AboutSection/>
        <FeedbackSection/>
      </div>
    </Fragment>
  )
}
