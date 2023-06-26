import DetailUserInfoContainer from "@/components/user/DetailUserInfoContainer";
import FullName from "@/components/user/FullName";
import React, {useState, useEffect, Fragment} from "react";
import Tabs, {Tab} from "react-best-tabs";
import ProfileSekeleton from "@/components/Sekeleton/ProfileSekeleton";
import CoverImageSection from "@/components/user/CoverImageSection";
import AvatarWithUpload from "@/components/user/AvatarWithUpload";
import {useSelector} from "react-redux";
import PointComponent from "@/components/points/PointComponent";
import Award from "@/components/points/Award";
import ResultProfile from "@/components/result/ResultProfile";
import {useRouter} from "next/router";
import HistorySection from "@/components/user/HistorySection";

export default function ProfileUser() {
  const user = useSelector((state) => state.auth.profile);
  const [isClient, setIsClient] = useState(true);
  const [tabActive, setTabActive] = useState(1);
  const [index, setIndex] = useState(0);
  const router = useRouter()
  const handleSelectTab = (event, tab) => {
    setIndex(index + 1)
    setTabActive(tab)
  }
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (!user?._id) {
  //       router.push('/sign-in')
  //     }
  //   }, 1000)
  // }, [user])
  const genUITab = () => {
    if (tabActive === 2) {
      return <HistorySection userId={user._id}/>
    } else if (tabActive === 3) {
      return <HistorySection userId={user._id} isToeic={true}/>
    }
    return <ResultProfile/>
  }
  return (
    <div>
      {user._id ? (
        <Fragment>
          <div className="bg-base-100">
            <div className="container mx-auto bg-base-100">
              <CoverImageSection
                imgCover={user?.imageCover}
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
                className={`lg:mt-5 md:mt-24 mt-20 lg:ml-[210px] lg:w-fit w-full flex items-center lg:items-start justify-center flex-col md:pb-0 pb-4`}>
                <FullName
                  fullName={user.name}
                  className={"lg:text-3xl text-2xl block"}
                ></FullName>
                <PointComponent userInfo={user}/>
              </div>
              <div className="bg-base-100 pb-4 relative hidden md:block">
                <div className="divider"></div>
              </div>
            </div>
          </div>
          <div className="bg-base-200 md:pt-0 pt-4">
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
                <div key={index}>
                  {genUITab()}
                </div>
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
