import Image from "next/image";
import React, {useEffect, useState} from "react";
import ButtonPrimary from "../button/ButtonPrimary";
import InputWithoutValidate from "../input/InputWithoutValidate";
import CheckBox from "../input/CheckBox";
import RadioWithoutValidate from "../input/RadioWithoutValidate";
// import {
//   categoryConfig,
//   districtsConfig,
//   provincesConfig,
//   tradingFormConfig,
//   wardsConfig,
// } from "configs/configs";
import TextArea from "../input/TextArea";
import {Label} from "../label";
// import { reportAPI } from "apis/report";
import {toast} from "react-toastify";
import {reasonReportExamOptions, reasonReportQuestionOptions} from "../../configs/configs";

const ModalReportPost = (
  {
    handleClick = () => {
    },
    id,
    objectId,
    isQuestion = false
  }) => {
  const [selectedReason, setSelectedReason] = useState(null);
  const [reasonInput, setReasonInput] = useState('');
  const [reasonReportOptions, setReasonReportOptions] = useState([]);

  useEffect(() => {
    if (isQuestion) {
      setReasonReportOptions([...reasonReportQuestionOptions])
    } else {
      setReasonReportOptions([...reasonReportExamOptions])
    }
  }, [])

  const handleSelectReason = (item) => {
    setReasonInput(null);
    const temp = reasonReportOptions.map((i) => {
      if (i.id === item.id) {
        setSelectedReason(i);
        return {
          ...i,
          isChecked: true,
        };
      } else {
        return i;
      }
    });
    setReasonReportOptions([...temp]);
  };

  const handleReport = async () => {
    try {
      //   let reasonData = null;
      //   if (selectedReason.id !== 5) {
      //     reasonData = selectedReason.title;
      //   } else {
      //     reasonData = reasonInput;
      //   }
      //   const res = await reportAPI.reportPost({
      //     id: postId,
      //     data: { reason: reasonData, postId },
      //   });
      //   if (res.ok) {
      //     const modal = document.getElementById("modal-report-post-id");
      //     if (modal) {
      //       modal.click();
      //     }
      //     toast.success("Báo cáo bài viết thành công!", {
      //       position: "bottom-right",
      //       autoClose: 5000,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //       theme: "colored",
      //     });
      //   } else {
      //     toast.error("Đã có lỗi xảy ra!", {
      //       position: "bottom-right",
      //       autoClose: 5000,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //       theme: "colored",
      //     });
      //   }
    } catch (e) {
      console.log(e);
      toast.error("Đã có lỗi xảy ra!", {
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
    <div>
      <input type="checkbox" id={id} className="modal-toggle"/>
      <label
        htmlFor={id}
        className="modal cursor-pointer"
        id={"modal-report-post-id"}
      >
        <label className="modal-box relative" htmlFor="">
          <div className="">
            <h3 className="text-lg font-bold my-0">Báo cáo</h3>
            <div className="py-2">
              Bạn có thể lựa chọn lý do báo cáo {!isQuestion ? ' đề thi' : 'câu hỏi này'} với lý do sau:
            </div>
            <div className="flex flex-col space-y-4 my-2">
              {reasonReportOptions.map((item) => (
                <div
                  key={item.id}
                  className={"flex items-center space-x-3 border border-gray-200 p-3 rounded-lg select-none"}

                >
                  <RadioWithoutValidate
                    checked={item.isChecked}
                    name={"reasonReport"}
                    id={"reasonReportRadio"}
                    onChange={() => handleSelectReason(item)}
                  />
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
            {selectedReason?.id === 5 && (
              <div className="py-2 flex">
                <textarea
                  placeholder="Nhập lý do khác"
                  value={reasonInput}
                  onChange={(e) => setReasonInput(e.target.value)}
                  className="p-3 border border-gray-200 rounded-lg w-full focus:border-primary outline-none min-h-[100px]"
                ></textarea>
              </div>
            )}
          </div>
          <div className="my-4 flex items-center space-x-3 justify-end">
            <label className={'hover:cursor-pointer hover:opacity-70'} htmlFor={id}>Hủy bỏ</label>
            <ButtonPrimary
              title="Báo cáo"
              className="w-[150px]"
              handleClick={handleReport}
            />
          </div>
        </label>
      </label>
    </div>
  );
};

export default ModalReportPost;
