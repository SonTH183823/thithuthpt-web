import React, {useEffect, useState} from "react";
import LayoutWithSideBar from "@/components/layout/LayoutWithSideBar";
import Avatar from "@/components/user/Avatar";
import {Fragment} from "react";
import ButtonSecondary from "@/components/button/ButtonSecondary";
// import Select from "react-select";
import FormGroup from "@/components/common/FormGroup";
import {Label} from "@/components/label";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import AvatarWithUpload from "@/components/user/AvatarWithUpload";
import {useDispatch, useSelector} from "react-redux";
import ButtonPrimary from "@/components/button/ButtonPrimary";
// import { async } from "@firebase/util";
// import { userAPI } from "apis/user";
import {toast} from "react-toastify";
import {CharacteristicsItem, CharacteristicsItemIcon} from "@/components/characteristics/CharacteristicsItem";
// import { authUpdateProfile } from "store/auth/auth-slice";
import phone from '@/assets/images/svg/telephone.svg'
import mail from '@/assets/images/svg/mail.svg'

const schema = yup.object({
    displayName: yup.string().required("Vui lòng nhập họ tên"),
});
export default function MyProfile() {
    // const profile = useSelector((state) => state.auth.profile);
    const profile = {
        id: 1,
        avatar: 'https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288886.jpg?w=1060&t=st=1682246507~exp=1682247107~hmac=0951d0b31f4818357029f194a8c5e916ff2d7867d5b6d0ed2bd391e65cf1b17b',
        displayName: 'Nguyễn Ngọc Diệp',
        phoneNumber: '0388676479',
        email: 'sonto2k@gmail.com'
    }
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (profile.displayName) {
            setAddress(profile.address);
            setName(profile.displayName)
        }
    }, [profile]);

    const handleUpdate = async (values) => {
        try {
            const data = {...values};
            if (address) {
                data.address = address;
            }
            // const res = await userAPI.updateAccount({
            //   id: profile.id,
            //   data: { ...data },
            // });
            // if (res.ok) {
            //   const profileRes = await userAPI.getProfile();
            //   dispatch(authUpdateProfile(profileRes));
            //   toast.success("Cập nhật thông tin thành công!", {
            //     position: "bottom-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "colored",
            //   });
            // } else {
            //   toast.error("Đã có lỗi xảy ra!", {
            //     position: "bottom-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "colored",
            //   });
            // }
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
        <div
            className={
                "my-4 lg:px-4 px-2 py-8 mx-auto flex items-center flex-col max-w-[700px]"
            }
        >
            {profile.id && (
                <div className={"w-full"}>
                    <div className={"text-primary font-semibold text-2xl"}>Thông tin tài khoản</div>
                    <div>
                        <div className={"flex justify-center mb-4"}>
                            <AvatarWithUpload
                                width={150}
                                height={150}
                                avatar={profile.avatar}
                                userId={profile.id}
                            />
                        </div>
                        <form onSubmit={handleSubmit(handleUpdate)}>
                            <div className={"flex-col flex space-y-2"}>
                                <FormGroup isMb={false}>
                                    <Label>Họ tên</Label>
                                    <input
                                        type={"text"}
                                        className={
                                            "px-2 py-3 rounded-lg border border-gray-200 flex-1 outline-none focus:border-primary"
                                        }
                                        placeholder={
                                            "VD: Nguyễn Văn Anh"
                                        }
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <div className="font-bold w-[120px]">Trường THPT</div>
                                    <input
                                        type={"text"}
                                        className={
                                            "px-2 py-3 rounded-lg border border-gray-200 flex-1 outline-none focus:border-primary"
                                        }
                                        placeholder={
                                            "VD: THPT Thường Tín"
                                        }
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <div className="font-bold">Số điện thoại</div>
                                    <div className={"flex items-center justify-between"}>
                                        <CharacteristicsItem icon={phone}>
                                            <span>{profile.phoneNumber}</span>
                                        </CharacteristicsItem>
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <div className="font-bold">Email</div>
                                    <div className={"flex items-center justify-between"}>
                                        <CharacteristicsItem icon={mail}>
                                            <span>{profile.email}</span>
                                        </CharacteristicsItem>
                                    </div>
                                </FormGroup>
                            </div>
                            <div>
                                <ButtonPrimary
                                    className="w-[200px] float-right"
                                    title="Cập nhật"
                                    type="submit"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
