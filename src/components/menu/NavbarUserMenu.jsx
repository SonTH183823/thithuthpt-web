import React, {Fragment} from "react";
import {Menu, MenuItem, MenuButton} from "@szhsin/react-menu";
import {useRouter} from "next/router";
import {MenuItem as MyMenuItem} from "./MenuItem";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {removeToken} from "utils/auth";
import {authUpdateProfile} from "store/auth/auth-slice";
import {
  menuGuest,
  menuUser,
} from "../../configs/configs";
import {authAPI} from "apis/auth";
import {async} from "@firebase/util";
import Cookies from "js-cookie";

export default function NavbarUserMenu() {
  const profile = useSelector((state) => state.auth.profile);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleMenuClick = async (item) => {
    if (item.id === 115) {
      const res = await authAPI.logout();
      if (res.ok) {
        dispatch(authUpdateProfile({}));
        removeToken();
        router.replace(`/`);
      }
    } else if (item.path) {
      router.push(item.path);
    }
  };

  const getMenu = () => {
    if (Object.keys(profile).length > 0) {
      return menuUser;
    } else {
      return menuGuest;
    }
  };
  return (
    <div className="flex items-center justify-center">
      <Menu
        menuButton={
          <MenuButton>
            {profile.avatar ? (
              <div className="h-[39px] w-[39px] relative">
                {/*<Image*/}
                {/*  alt="avatar"*/}
                {/*  layout="fill"*/}
                {/*  objectFit="cover"*/}
                {/*  src={profile.avatar}*/}
                {/*  className="rounded-full"*/}
                {/*/>*/}
                <img src={profile.avatar} alt={''} className={'rounded-full'}/>
              </div>
            ) : (
              <i className="fa-sharp fa-regular fa-circle-user text-4xl text-primary"></i>
            )}
          </MenuButton>
        }
        transition
      >
        <Fragment>
          {getMenu().map((item) => (
            <MenuItem onClick={() => handleMenuClick(item)} key={item.id}>
              <MyMenuItem title={item.title} icon={item.icon}/>
            </MenuItem>
          ))}
        </Fragment>
      </Menu>
    </div>
  );
}
