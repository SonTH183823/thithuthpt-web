import Image from "next/image";
import React from "react";
import ButtonPrimary from "../button/ButtonPrimary";
import logo from "@/assets/images/logo-full.png";
const ModalRequireLogin = ({ handleClick = () => {}, id }) => {
  return (
    <div>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label
        htmlFor={id}
        className="modal cursor-pointer"
        id={"modal-require-login-id"}
      >
        <label className="modal-box relative" htmlFor="">
          <div className="flex flex-col items-center space-y-2">
            <h3 className="text-lg font-bold my-0">Vui lòng đăng nhập.</h3>
            <div className="relative w-[300px] h-[120px]">
              <Image
                alt="logo"
                layout="fill"
                className="object-contain"
                src={logo}
              />
            </div>
            <div className="text-center">
              Đăng nhập vào hệ thống để sử dụng đầy đủ các tính năng.
            </div>
          </div>
          <div className="my-4">
            <label htmlFor={id}>
              <ButtonPrimary
                title="Đăng nhập ngay"
                className="w-full"
                handleClick={handleClick}
              />
            </label>
          </div>
        </label>
      </label>
    </div>
  );
};

export default ModalRequireLogin;
