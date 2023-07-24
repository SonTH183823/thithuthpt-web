import * as React from "react";
import photo_camera from "@/assets//images/svg/photo-camera.svg";
import Image from "next/image";
import {genURLImage} from "../../utils/common";
import {faCircleUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Avatar({
                                 sizeAvatar = "",
                                 avatar,
                                 className = "",
                                 isShowUploadIcon = false,
                                 onClickAva
                               }) {
  return (
    <div
      className={`avatar ${className} relative border border-gray-100 rounded-full`}
      onClick={onClickAva}
    >
      <div className={`${sizeAvatar} rounded-full bg-white`}>
        {avatar ?
          <img src={genURLImage(avatar)} alt={"avatar-user"}/> :
          <FontAwesomeIcon icon={faCircleUser} className={'text-primary w-full !h-full'}/>}
      </div>
      {isShowUploadIcon && (
        <div
          className={
            "bg-gray-200 w-fit h-fit p-2 rounded-full absolute bottom-2 right-2 cursor-pointer"
          }
        >
          <div className={"relative w-[20px] h-[20px] box-shadow"}>
            <Image
              src={photo_camera}
              alt={"icon upload"}
              layout={"fill"}
              objectFit={"cover"}
            />
          </div>
        </div>
      )}
    </div>
  );
}
