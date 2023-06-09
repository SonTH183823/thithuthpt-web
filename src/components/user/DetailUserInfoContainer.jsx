// import { async } from "@firebase/util";
// import { userAPI } from "apis/user";
import React, {useState, useEffect, Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
// import { authUpdateProfile } from "store/auth/auth-slice";
import {checkPoint, formatPrice, generateDate} from "utils/common";
import ButtonSecondary from "../button/ButtonSecondary";
import DetailInfoItem from "./DetailUserInfoItem";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import {userAPI} from "../../apis/user";
import {authUpdateProfile} from "../../store/auth/auth-slice";
import PointComponent from "@/components/points/PointComponent";
import {awardsConfig} from "../../configs/configs";

export default function DetailUserInfoContainer({
                                                  profile: user,
                                                  showBanlance = true,
                                                }) {
  const [bio, setBio] = useState("");
  const [showEditBio, setShowEditBio] = useState(false);
  const profile = useSelector((state) => state.auth.profile);
  const dispatch = useDispatch();

  const [awardPresent, setAwardPresent] = useState({})
  useEffect(() => {
    const index = checkPoint(awardsConfig, user.pointCredits)
    if (index > 0) {
      setAwardPresent(awardsConfig[index - 1])
    }
  }, [])
  const handleChangeInput = (e) => {
    setBio(e.target.value);
  };
  const handleShowEditBio = () => {
    setShowEditBio(!showEditBio);
  };
  useEffect(() => {
    if (user.bio) {
      setBio(user.bio);
      setShowEditBio(false);
    }
  }, [user]);
  const updateBio = async () => {
    try {
      const res = await userAPI.updateAccount({data: {bio}});
      if (res.ok) {
        setShowEditBio(false);
        const profileRes = await userAPI.getProfile();
        dispatch(authUpdateProfile(profileRes));
        toast.success("Cập nhật thông tin thành công!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (e) {
      console.log(e);
      toast.error("Cập nhật thông tin thất bại!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  return (
    <div className="flex flex-col space-y-4 ">
      {/*{showBanlance && (*/}
      {/*  <div className="lg:px-4 px-2 lg:py-6 py-2 lg:rounded-lg box-shadow bg-base-100 text-sm">*/}
      {/*    <h3 className={"m-0"}>Số dư tài khoản</h3>*/}
      {/*    <div*/}
      {/*      className={*/}
      {/*        "text-center text-3xl font-bold text-primary pt-6 md:mb-0 mb-6"*/}
      {/*      }*/}
      {/*    >*/}
      {/*      {formatPrice(user.balance)}*/}
      {/*      <span> &#8363;</span>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*)}*/}
      <div className="lg:px-4 px-2 lg:py-6 py-2 lg:rounded-lg box-shadow bg-base-100 text-sm">
        <div>
          <h3 className={"m-0"}>Giới thiệu</h3>
          {profile._id === user._id ? (
            <div>
              {user.bio && !showEditBio ? (
                <div>
                  <p className={"text-center text-info mb-4"}>{user?.bio}</p>
                  <ButtonPrimary
                    isPrimary={true}
                    title={"Chỉnh giới thiệu"}
                    className={"w-full text-center mt-4 mb-2"}
                    handleClick={handleShowEditBio}
                  />
                </div>
              ) : (<Fragment>
                  {!user.bio && !showEditBio ? (
                    <ButtonPrimary
                      isPrimary={true}
                      title={"Cập nhật giới thiệu"}
                      className={"w-full text-center mt-4 mb-2"}
                      handleClick={handleShowEditBio}
                    />
                  ) : (
                    <Fragment>
                      <textarea
                        className={"w-full outline-none border border-primary my-2 resize-none p-4 rounded-lg bg-base-100"}
                        placeholder={"Giới thiệu về bản thân nhé..."}
                        value={bio}
                        onChange={handleChangeInput}/>
                      <div className="flex justify-end space-x-3 items-center">
                        <span
                          className="cursor-pointer"
                          onClick={handleShowEditBio}
                        >
                          Hủy bỏ
                        </span>
                        <ButtonSecondary
                          isPrimary={true}
                          title={"Cập nhật"}
                          handleClick={updateBio}
                          className={"mt-2 mb-3"}
                        />
                      </div>
                    </Fragment>
                  )}
                </Fragment>
              )}
            </div>
          ) : (
            <p className={"text-center text-info mb-4"}>{user?.bio}</p>
          )}
          <div className={"h-[1px] bg-backgroundGray mb-4"}></div>
        </div>
        <div>
          <DetailInfoItem icon={"fa-solid fa-award text-[16px]"}>
            <span className={"font-bold text-primary"}>{awardPresent.title}</span>
          </DetailInfoItem>
          {user?.school && <DetailInfoItem icon={"fa-solid fa-school-flag"}>
            <div>
              Học tại
              <span className="font-semibold text-justify">
                  {" "}
                {user.school}
                </span>
            </div>
          </DetailInfoItem>}
          {user?.address && (
            <DetailInfoItem icon={"fa-solid fa-location-dot"}>
              <div>
                Sống tại
                <span className="font-semibold text-justify">
                  {" "}
                  {user.address}
                </span>
              </div>
            </DetailInfoItem>
          )}
          <DetailInfoItem icon={"fa-solid fa-clock"}>
            <span>
              Đã tham gia vào
              <span className="font-semibold">
                {" "}
                {generateDate(user.createdAt)}
              </span>
            </span>
          </DetailInfoItem>
        </div>
      </div>
    </div>
  );
}
