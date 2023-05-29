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

export default function ProfileUser() {
  const user = useSelector((state) => state.auth.profile);
  const imageCover = 'https://img.freepik.com/free-photo/los-angeles-downtown-buildings-night_649448-298.jpg?w=2000&t=st=1682246479~exp=1682247079~hmac=c47ba41a6a4b0b14185566ea5c180982948e1d72319415edd3f4a36dfd8ec5db'
  const [isClient, setIsClient] = useState(true);
  const [tabActive, setTabActive] = useState(1);
  const handleSelectTab = (event, tab) => {
    setTabActive(tab)
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
              <div className="lg:mt-5 md:mt-24 mt-20 lg:ml-[230px] lg:w-fit w-full flex items-center justify-center">
                <FullName
                  fullName={user.name}
                  className={"lg:text-3xl text-2xl block"}
                ></FullName>
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
              </div>
              <div className="col-span-2 lg:px-0 px-2 pb-2">
                <div className="custom-tab">
                  {isClient && (
                    <Tabs
                      activeTab={tabActive}
                      className="mt-5 p-2 rounded-lg box-shadow bg-base-100 lg:mt-0 lg:my-4 my-2"
                      ulClassName=""
                      onClick={(e, tab) => handleSelectTab(e, tab)}
                    >
                      <Tab title="Tổng quan"
                           className={`mr-10 text-lg font-bold ${tabActive === 1 ? 'text-primary' : ''}`}></Tab>
                      <Tab title="Lịch sử làm bài"
                           className={`mr-10 text-lg font-bold ${tabActive === 2 ? 'text-primary' : ''}`}></Tab>

                    </Tabs>
                  )}
                </div>
                {/*<PostsSection userId={user.id}/>*/}
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
