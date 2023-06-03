import PrimaryPostItem from "@/components/exam/PrimaryExamItem";
import Avatar from "@/components/user/Avatar";
import DetailUserInfoContainer from "@/components/user/DetailUserInfoContainer";
import FullName from "@/components/user/FullName";
import React, {useState, useEffect, Fragment} from "react";
import Tabs, {Tab} from "react-best-tabs";
// import { PostAPI } from "apis/post";
import Link from "next/link";
import ProfileSekeleton from "@/components/Sekeleton/ProfileSekeleton";
import CoverImageSection from "@/components/user/CoverImageSection";
import AvatarWithUpload from "@/components/user/AvatarWithUpload";
import PostsSection from "@/components/user/PostsSection";
import {useSelector} from "react-redux";
import Select from "react-select";
import {sortHistoryConfig} from "../../configs/configs";
import PointComponent from "@/components/points/PointComponent";
import Award from "@/components/points/Award";
import ResultComponents from "@/components/result/ResultComponents";
import ResultProfile from "@/components/result/ResultProfile";
import DocumentsSection from "@/components/documents/DocumentsSection";

export default function ProfileUser() {
  const user = useSelector((state) => state.auth.profile);
  const imageCover = 'https://img.freepik.com/free-photo/los-angeles-downtown-buildings-night_649448-298.jpg?w=2000&t=st=1682246479~exp=1682247079~hmac=c47ba41a6a4b0b14185566ea5c180982948e1d72319415edd3f4a36dfd8ec5db'
  const [isClient, setIsClient] = useState(true);
  const [tabActive, setTabActive] = useState(2);
  const [sort, setSort] = useState(sortHistoryConfig[0]);
  const handleSelectTab = (event, tab) => {
    setSort(sortHistoryConfig[0])
    setTabActive(tab)
  }
  const genUITab = () => {
    if (tabActive === 2) {
      return (
        <>
          <div
            className={'shadow-md px-3 flex justify-between bg-white rounded-lg items-center text-sm md:text-base mb-4'}>
            <div>Lịch sử làm bài <span className={'font-bold'}>69</span> kết quả</div>
            <div className={'flex items-center space-x-2'}>
              <div className={'font-semibold'}>Sắp xếp</div>
              <Select
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderRadius: "5px",
                    borderColor: "#e5e7eb",
                    margin: "8px 0",
                    width: "170px",
                  }),
                }}
                options={sortHistoryConfig}
                onChange={(option) => {
                  setSort(option)
                }}
                value={sort}
              />
            </div>
          </div>
          <PostsSection userId={user.id}/>
        </>
      )
    } else if (tabActive === 3) {
      return (
        <>
          <div
            className={'shadow-md px-3 flex justify-between bg-white rounded-lg items-center text-sm md:text-base mb-4'}>
            <div>Lịch sử làm bài <span className={'font-bold'}>69</span> kết quả</div>
            <div className={'flex items-center space-x-2'}>
              <div className={'font-semibold'}>Sắp xếp</div>
              <Select
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderRadius: "5px",
                    borderColor: "#e5e7eb",
                    margin: "8px 0",
                    width: "170px",
                  }),
                }}
                options={sortHistoryConfig}
                onChange={(option) => {
                  setSort(option)
                }}
                value={sort}
              />
            </div>
          </div>
          <PostsSection userId={user.id}/>
        </>
      )
    }
    return (
      <>
        <ResultProfile/>
      </>
    )
  }
  return (
    <div>
      {user._id ? (
        <Fragment>
          <div className="bg-base-100">
            <div className="container mx-auto bg-base-100">
              <CoverImageSection
                imgCover={user?.imageCover || imageCover}
                userId={user._id}
                avatar={user.avatar}
              />
              <div className={"relative w-full"}>
                <div
                  className={
                    "absolute lg:left-10 left-2/4 lg:-translate-x-0 -translate-x-2/4 -top-1/2 -translate-y-2/4 z-10"
                  }
                >
                  <AvatarWithUpload
                    width={150}
                    height={150}
                    avatar={user.avatar}
                    userId={user._id}
                  />
                </div>
              </div>
              <div
                className={`lg:mt-5 md:mt-24 mt-20 lg:ml-[210px] lg:w-fit w-full flex items-center lg:items-start justify-center flex-col`}>
                <FullName
                  fullName={user.name}
                  className={"lg:text-3xl text-2xl block"}
                ></FullName>
                <PointComponent/>
              </div>
              <div className="bg-base-100 pb-4 relative hidden md:block">
                <div className="divider"></div>
              </div>
            </div>
          </div>
          <div className="bg-base-200">
            <div className="grid-cols-3 lg:grid lg:space-x-5 lg:p-4 lg:px-0 container mx-auto">
              <div className="col-span-1 h-fit">
                <DetailUserInfoContainer profile={user} userId={user._id}/>
                <div className={'my-3 block p-4 bg-base-100 rounded-lg shadow-md'}>
                  <Award userInfo={user}/>
                </div>
              </div>
              <div className="col-span-2 lg:px-0 px-2 pb-2">
                <div className="custom-tab">
                  {isClient && (
                    <Tabs
                      activeTab={tabActive}
                      className="mt-5 py-3 px-3 rounded-lg box-shadow bg-base-100 lg:mt-0 lg:my-4 my-2"
                      ulClassName=""
                      onClick={(e, tab) => handleSelectTab(e, tab)}
                    >
                      <Tab title="Tổng quan"
                           className={`mr-10 text-lg font-bold ${tabActive === 1 ? 'text-primary' : ''}`}></Tab>
                      <Tab title="Lịch sử làm bài"
                           className={`mr-10 text-lg font-bold ${tabActive === 2 ? 'text-primary' : ''}`}></Tab>
                      <Tab title="Toeic"
                           className={`mr-10 text-lg font-bold ${tabActive === 3 ? 'text-primary' : ''}`}></Tab>
                    </Tabs>
                  )}
                </div>
                {genUITab()}
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <ProfileSekeleton/>
      )}
    </div>
  );
}
