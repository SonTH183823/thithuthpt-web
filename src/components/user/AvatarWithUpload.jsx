import React, {useEffect, useState} from "react";
import photo_camera from "@/assets//images/camera/photo-camera.svg";
import Image from "next/image";
import {convertBase64} from "utils/uploadImage";
import {userAPI} from "apis/user";
import {toast} from "react-toastify";
import {authUpdateProfile} from "store/auth/auth-slice";
import {useDispatch} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser, faUser} from "@fortawesome/free-solid-svg-icons";
import {uploadAPI} from "../../apis/upload";
import {domainUpload} from "../../configs/configs";
import {genURLImage} from "../../utils/common";

export default function AvatarWithUpload({
                                           width = 40,
                                           height = 40,
                                           avatar = "",
                                           className = "",
                                           userId = "",
                                         }) {
  const [avatarSource, setAvatarSource] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (avatar) {
      setAvatarSource(avatar);
    }
  }, [avatar]);
  const handleUploadAvatar = async (e) => {
    if (e.target.files[0]) {
      setAvatarSource(URL.createObjectURL(e.target.files[0]));
      try {
        const res = await uploadAPI.uploadFile(e.target.files[0])
        if (res?.filename) {
          const res2 = await userAPI.updateAccount({
            id: userId,
            data: {avatar: res.filename},
          });
          if (res2.ok) {
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
          } else {
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
    }
  };
  return (
    <div className="relative">
      <div className={`avatar ${className} h-[${height}px]`}>
        {avatarSource ? (
          <div className={`rounded-full box-shadow`}>
            <img
              src={genURLImage(avatarSource)}
              alt={"avatar-user"}
              width={width}
              height={height}
            />
          </div>
        ) : <div className="h-[150px] w-[150px] rounded-full bg-white">
          <FontAwesomeIcon icon={faCircleUser} className={'text-primary w-full !h-full'}/>
        </div>}
      </div>
      <label
        htmlFor={"upload-avatar"}
        className={
          "bg-gray-200 w-fit h-fit p-2 rounded-full absolute bottom-2 right-2 cursor-pointer"
        }
      >
        <div className={"relative w-[20px] h-[20px]"}>
          <Image src={photo_camera} alt={"icon upload"}/>
        </div>
      </label>
      <input
        type={"file"}
        hidden
        accept="image/png, image/svg, image/jpeg"
        id={"upload-avatar"}
        onChange={(e) => handleUploadAvatar(e)}
      />
    </div>
  );
}
