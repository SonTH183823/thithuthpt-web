import React, { useState } from "react";
import ButtonPrimary from "../button/ButtonPrimary";
import StarRating from "../feedback/StarRating";
import TextArea from "../input/TextArea";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { feedbackAPI } from "apis/feedback";
import { toast } from "react-toastify";

const ModalFeedback = ({ id, profile }) => {
  const [rating, setRating] = useState(0);
  const schema = yup.object({
    feedback: yup.string().required("Vui lòng nhập nhận xét"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const changeRating = (newRating) => {
    setRating(newRating);
  };

  const handleCreateFeedback = async (values) => {
    try {
      await feedbackAPI.createFeedback({
        star: rating,
        comment: values.feedback,
        name: profile.name,
        avatar: profile.avatar
      });
      const modal = document.getElementById("modal-feedback");
      if (modal) {
        modal.click();
      }
      toast.success("Đánh giá thành công!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (e) {
      console.log(e);
      toast.error("Đã có lỗi xảy ra!", {
        position: "bottom-right",
        autoClose: 3000,
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
      <input type="checkbox" id={id} className="modal-toggle" />
      <label
        htmlFor={id}
        className="modal cursor-pointer"
        id={"modal-feedback"}
      >
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">
            Trải nghiệm của bạn với
            <span className="text-primary"> thithuthpt</span>?
          </h3>
          <StarRating rating={rating} changeRating={changeRating} />
          <div className="py-4                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         ">
            <form onSubmit={handleSubmit(handleCreateFeedback)}>
              <TextArea
                control={control}
                name={"feedback"}
                error={errors.feedback?.message}
              ></TextArea>
              <div>
                <ButtonPrimary
                  title="Gửi đánh giá"
                  className="float-right px-2"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </label>
      </label>
    </div>
  );
};

export default ModalFeedback;
