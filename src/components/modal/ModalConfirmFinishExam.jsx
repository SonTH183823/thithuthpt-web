import Image from "next/image";
import React from "react";
import ButtonPrimary from "../button/ButtonPrimary";
import finishExam from "@/assets/images/finishExam.png";

const ModalConfirmFinishExam = (
  {
    handleClick = () => {
    }, id
  }) => {
  return (
    <div>
      <input type="checkbox" id={id} className="modal-toggle"/>
      <label
        htmlFor={id}
        className="modal cursor-pointer"
        id={"modal-confirm-finish-exam-id"}
      >
        <label className="modal-box relative" htmlFor="">
          <div className="flex flex-col items-center space-y-2">

            <div className="relative w-[300px] h-[120px]">
              <Image
                alt="logo"
                layout="fill"
                className="object-contain"
                src={finishExam}
              />
            </div>
            <h3 className="text-lg font-bold my-0">Bạn có chắc chắn muốn nộp bài?</h3>
            <div className="text-center">
              Vui lòng kiểm tra lại các câu trả lời trước khi nộp bài. Bạn không thể thay đổi câu trả lời sau khi nộp
              bài.
            </div>
          </div>
          <div className="my-4">
            <label htmlFor={id}>
              <ButtonPrimary
                title="Nộp bài"
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

export default ModalConfirmFinishExam;
