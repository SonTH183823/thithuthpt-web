import React, {useEffect, useState} from "react";
import FormGroup from "@/components/common/FormGroup";
import {Label} from "@/components/label";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import AvatarWithUpload from "@/components/user/AvatarWithUpload";
import {useDispatch, useSelector} from "react-redux";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import {userAPI} from "apis/user";
import {toast} from "react-toastify";
import {CharacteristicsItem} from "@/components/characteristics/CharacteristicsItem";
import {authUpdateProfile} from "store/auth/auth-slice";
import phone from '@/assets/images/svg/telephone.svg'
import mail from '@/assets/images/svg/mail.svg'
import {useRouter} from "next/router";

const schema = yup.object({
  displayName: yup.string().required("Vui lòng nhập họ tên"),
});
export default function MyProfile() {
  const profile = useSelector((state) => state.auth.profile);
  const [address, setAddress] = useState("");
  const [school, setSchool] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const router = useRouter()
  const {
    handleSubmit, formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (profile.name) setName(profile.name)
    if (profile.address) setAddress(profile.address)
    if (profile.school) setSchool(profile.school)
  }, [profile])

  const handleUpdate = async () => {
    try {
      const data = {...profile, name};
      if (address) {
        data.address = address;
      }
      if (school) {
        data.school = school;
      }
      const res = await userAPI.updateAccount({
        data: {...data},
      });
      if (res?.ok) {
        const profileRes = await userAPI.getProfile();
        dispatch(authUpdateProfile(profileRes));
        toast.success("Cập nhật thông tin thành công!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        await router.push('/profile/me')
      } else {
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
  return (<div
    className={"my-4 lg:px-4 px-2 py-8 mx-auto flex items-center flex-col max-w-[700px]"}
  >
    {profile._id && (<div className={"w-full"}>
      <div className={"text-primary font-semibold text-2xl"}>Thông tin tài khoản</div>
      <div>
        <div className={"flex justify-center mb-4"}>
          <AvatarWithUpload
            width={150}
            height={150}
            avatar={profile.avatar}
            userId={profile._id}
          />
        </div>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className={"flex-col flex space-y-2"}>
            <FormGroup isMb={false}>
              <Label>Họ tên</Label>
              <input
                type={"text"}
                className={"px-2 py-3 rounded-lg border border-gray-200 flex-1 outline-none focus:border-primary"}
                placeholder={"VD: Nguyễn Văn Anh"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <div className="font-bold w-[120px]">Địa chỉ</div>
              <input
                type={"text"}
                className={
                  "px-2 py-3 rounded-lg border border-gray-200 flex-1 outline-none focus:border-primary"
                }
                placeholder={
                  "VD: 40, ngõ 562 Trần Cung, Cổ Nhuế 1, Bắc Từ Liêm, Hà Nội."
                }
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <div className="font-bold w-[120px]">Trường THPT</div>
              <input
                type={"text"}
                className={"px-2 py-3 rounded-lg border border-gray-200 flex-1 outline-none focus:border-primary"}
                placeholder={"VD: THPT Thường Tín"}
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              />
            </FormGroup>

            {profile?.phoneNumber ? <FormGroup>
                <div className="font-bold">Số điện thoại</div>
                <div className={"flex items-center justify-between"}>
                  <CharacteristicsItem icon={phone}>
                    <span>{profile.phoneNumber}</span>
                  </CharacteristicsItem>
                </div>
              </FormGroup> :

              <FormGroup>
                <div className="font-bold">Email</div>
                <div className={"flex items-center justify-between"}>
                  <CharacteristicsItem icon={mail}>
                    <span>{profile.email}</span>
                  </CharacteristicsItem>
                </div>
              </FormGroup>}
          </div>
          <div>
            <ButtonPrimary
              className="w-[200px] float-right"
              title="Cập nhật"
              handleClick={handleUpdate}
            />
          </div>
        </form>
      </div>
    </div>)}
  </div>);
}
