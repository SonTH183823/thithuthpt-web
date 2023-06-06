import DetailUserInfoContainer from "@/components/user/DetailUserInfoContainer";
import FullName from "@/components/user/FullName";
import React, {useState, useEffect, Fragment} from "react";
import Tabs, {Tab} from "react-best-tabs";
import ProfileSekeleton from "@/components/Sekeleton/ProfileSekeleton";
import CoverImageSection from "@/components/user/CoverImageSection";
import PointComponent from "@/components/points/PointComponent";
import Award from "@/components/points/Award";
import ResultProfile from "@/components/result/ResultProfile";
import {useRouter} from "next/router";
import {userAPI} from "../../apis/user";
import Avatar from "@/components/user/Avatar";

export default function ProfileUser() {
  const imageCover = 'https://img.freepik.com/free-photo/los-angeles-downtown-buildings-night_649448-298.jpg?w=2000&t=st=1682246479~exp=1682247079~hmac=c47ba41a6a4b0b14185566ea5c180982948e1d72319415edd3f4a36dfd8ec5db'
  const [isClient, setIsClient] = useState(true);
  const [tabActive, setTabActive] = useState(1);
  const router = useRouter()
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const handleSelectTab = (event, tab) => {
    setTabActive(tab)
  }

  useEffect(() => {
    (async () => {
      if (router?.query?.slug) {
        try {
          setLoading(true);
          const id = router.query.slug.split("-").slice(-1);
          const profileRes = await userAPI.getProfileById(id);
          setLoading(false);
          setProfile(profileRes);
        } catch (e) {
          setLoading(false);
          console.log(e);
        }
      }
    })();
  }, [router.query]);
  const genUITab = () => {
    if (tabActive === 2 || tabActive === 3) {
      return (
        <div className={'flex items-center justify-center shadow-md rounded-xl py-24 bg-white mb-4'}>
          Chỉ ... mới có thể xem thông tin này!
        </div>
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
      {profile.id && !loading ?  (
        <Fragment>
          <div className="bg-base-100">
            <div className="container mx-auto bg-base-100">
              <CoverImageSection
                imgCover={imageCover}
                userId={profile.id}
                avatar={profile.avatar}
                showIconUpload={false}
              />
              <div className={"relative w-full"}>
                <div
                  className={
                    "absolute lg:left-10 left-2/4 lg:-translate-x-0 -translate-x-2/4 -top-1/2 -translate-y-2/4 z-10"
                  }
                >
                  <Avatar
                    sizeAvatar={"md:w-[160px] md:h-[160px] w-[130px] h-[130px]"}
                    isShowUploadIcon={false}
                    avatar={profile.avatar}
                  />
                </div>
              </div>
              <div
                className={`lg:mt-5 md:mt-24 mt-20 lg:ml-[210px] lg:w-fit w-full flex items-center lg:items-start justify-center flex-col md:pb-0 pb-4`}>
                <FullName
                  fullName={profile.name}
                  className={"lg:text-3xl text-2xl block"}
                ></FullName>
                <PointComponent/>
              </div>
              <div className="bg-base-100 pb-4 relative hidden md:block">
                <div className="divider"></div>
              </div>
            </div>
          </div>
          <div className="bg-base-200 md:pt-0 pt-4">
            <div className="grid-cols-3 lg:grid lg:space-x-5 lg:p-4 lg:px-0 container mx-auto">
              <div className="col-span-1 h-fit">
                <DetailUserInfoContainer profile={profile}/>
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
