import React, { useEffect } from "react";
import Avatar from "@/components/user/Avatar";
import SideBarItem from "@/components/side-bar/SideBarItem";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { authAPI } from "apis/auth";
import { removeToken } from "utils/auth";
import { authUpdateProfile } from "store/auth/auth-slice";
const sideBars = [
  { id: 1, icon: "fa-regular fa-ballot", title: "Quản lý tin đăng" },
  {
    id: 2,
    icon: "fa-regular fa-newspaper",
    title: "Quản lý tin tức",
  },
  {
    id: 3,
    icon: "fa-regular fa-messages-question",
    title: "Quản lý hỏi - đáp",
  },
  { id: 4, icon: "fa-regular fa-star", title: "Quản lý đánh giá" },
  { id: 5, icon: "fa-regular fa-users", title: "Quản lý tài khoản" },
  { id: 6, icon: "fa-regular fa-circle-dollar", title: "Cấu hình giá" },
  { id: 7, icon: "fa-regular fa-image", title: "Quản lý banner" },
  { id: 10, icon: "fa-regular fa-flag", title: "Quản lý báo xấu" },
  {
    id: 8,
    icon: "fa-light fa-globe",
    title: "Cấu hình giới thiệu",
  },
  { id: 111, icon: "fa-regular fa-user", title: "Quản lý thông tin cá nhân" },
  { id: 9, icon: "fa-regular fa-arrow-right-from-bracket", title: "Đăng xuất" },
];
const sideBarsCollaborator = [
  { id: 1, icon: "fa-regular fa-ballot", title: "Quản lý tin đăng" },
  {
    id: 2,
    icon: "fa-regular fa-newspaper",
    title: "Quản lý tin tức",
  },
  {
    id: 3,
    icon: "fa-regular fa-messages-question",
    title: "Quản lý hỏi - đáp",
  },
  { id: 4, icon: "fa-regular fa-star", title: "Quản lý đánh giá" },
  { id: 6, icon: "fa-regular fa-circle-dollar", title: "Cấu hình giá" },
  { id: 7, icon: "fa-regular fa-image", title: "Quản lý banner" },
  { id: 10, icon: "fa-regular fa-flag", title: "Quản lý báo xấu" },
  {
    id: 8,
    icon: "fa-light fa-globe",
    title: "Cấu hình giới thiệu",
  },
  { id: 111, icon: "fa-regular fa-user", title: "Quản lý thông tin cá nhân" },
  { id: 9, icon: "fa-regular fa-arrow-right-from-bracket", title: "Đăng xuất" },
];
export default function SideBar(props) {
  const dispatch = useDispatch();
  const [sideBarActive, setSideBarActive] = useState(1);
  const profile = useSelector((state) => state.auth.profile);
  const router = useRouter();
  const handleChangeSideBarItem = async (index) => {
    setSideBarActive(index);

    switch (index) {
      case 1: {
        router.replace(`/managements/post`);
        break;
      }
      case 2: {
        router.replace(`/managements/new`);
        break;
      }
      case 3: {
        router.replace(`/managements/q&a`);
        break;
      }
      case 4: {
        router.replace(`/managements/feedback`);
        break;
      }
      case 6: {
        router.push(`/managements/price`);
        break;
      }
      case 5: {
        router.push(`/managements/account`);
        break;
      }
      case 7: {
        router.push(`/managements/banner`);
        break;
      }
      case 10: {
        router.push(`/managements/report`);
        break;
      }
      case 8: {
        router.push(`/managements/intro`);
        break;
      }
      case 111: {
        router.push(`/managements/profile`);
        break;
      }
      case 9: {
        try {
          const sessionId = Cookies.get(process.env.NEXT_PUBLIC_SESSION_ID);
          const res = await authAPI.logout(sessionId);
          if (res.ok) {
            dispatch(authUpdateProfile({}));
            removeToken();
            router.replace(`/sign-in/permission`);
          }
          break;
        } catch (e) {
          console.log(e);
        }
      }
      default: {
        break;
      }
    }
  };

  useEffect(() => {
    if (router.pathname) {
      if (router.pathname.includes("post")) {
        setSideBarActive(1);
      } else if (router.pathname.includes("new")) {
        setSideBarActive(2);
      } else if (router.pathname.includes("q&a")) {
        setSideBarActive(3);
      } else if (router.pathname.includes("feedback")) {
        setSideBarActive(4);
      } else if (router.pathname.includes("account")) {
        setSideBarActive(5);
      } else if (router.pathname.includes("price")) {
        setSideBarActive(6);
      } else if (router.pathname.includes("banner")) {
        setSideBarActive(7);
      } else if (router.pathname.includes("intro")) {
        setSideBarActive(8);
      } else if (router.pathname.includes("price")) {
        setSideBarActive(111);
      }
    }
  }, [router]);

  const getSidebar = () => {
    if (profile.role > 1) {
      return sideBars;
    } else if (profile.role === 1) {
      return sideBarsCollaborator;
    }
  };
  return (
    <div className="hidden xl:block xl:w-[330px] h-[100vh] box-shadow sticky left-0 top-[76px] bottom-0">
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <Avatar sizeAvatar="w-16" avatar={profile.avatar} />
          <div>
            <div className="font-bold">{profile.displayName}</div>
            <div
              className={`text-white text-xs px-2 py-1 ${
                profile.role === 1 ? "bg-primary" : "bg-orange-400"
              } w-fit rounded-lg`}
            >
              {profile.role === 1 ? "Cộng tác viên" : "Admin"}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        {getSidebar()?.map((item) => (
          <div onClick={() => handleChangeSideBarItem(item.id)} key={item.id}>
            <SideBarItem item={item} active={item.id === sideBarActive} />
          </div>
        ))}
      </div>
    </div>
  );
}
