import Image from "next/image";
import React from "react";
import ButtonPrimary from "../button/ButtonPrimary";
import logo from "@/assets/images/logo-full.png";

const ModalConfirmStartExam = ({
                                   handleClick = () => {
                                   }, id
                               }) => {
    return (
        <div>
            <input type="checkbox" id={id} className="modal-toggle"/>
            <label
                htmlFor={id}
                className="modal cursor-pointer"
                id={"modal-confirm-start-exam-id"}
            >
                <label className="modal-box relative" htmlFor="">
                    <div className="flex flex-col items-center space-y-2">
                        <h3 className="text-lg font-bold my-0">Chú ý</h3>
                        <div className="relative w-[300px] h-[120px]">
                            <Image
                                alt="logo"
                                layout="fill"
                                className="object-contain"
                                src={logo}
                            />
                        </div>
                        <div className="text-center">
                            Thời gian làm bài sẽ bắt đầu tính. Khi thời gian làm bài còn 2 phút, đồng hồ sẽ chuyển sang
                            màu đỏ. Bạn nên chọn câu trả lời cho các câu hỏi còn lại, và nộp bài.
                        </div>
                        <div className="text-center">
                            Sau khi hết thời gian bạn không thể thay đổi câu trả lời.
                        </div>
                        <div className="text-center">
                            Kết quả sẽ xuất hiện sau khi bạn ấn Nộp Bài.
                        </div>
                    </div>
                    <div className="my-4">
                        <label htmlFor={id}>
                            <ButtonPrimary
                                title="Bắt đầu làm bài"
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

export default ModalConfirmStartExam;
