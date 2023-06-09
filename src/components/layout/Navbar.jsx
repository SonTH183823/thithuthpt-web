import React, {Fragment} from "react";
import Link from "next/link";
import Logo from "../common/Logo";
import {useRouter} from "next/router";
import NavbarUserMenu from "../menu/NavbarUserMenu";
// import NavbarServiceMenu from "../menu/NavbarServiceMenu";
import Notification from "../notification/Notification";
import NavbarSeeMoreMenu from "@/components/menu/NavbarSeeMoreMenu";
// import Drawer from "./DrawerLeft";
import useClickOutside from "../../hooks/useClickOutside";
// import DrawerRight from "./DrawerRight";
import {useSelector} from "react-redux";
import ModalRequireLogin from "../modal/ModalRequireLogin";
// import NavbarPostNew from "../menu/NavbarPostNew";
import Image from "next/image";
import NavbarSubjectMenu from "@/components/menu/NavbarSubjectMenu";
import Drawer from "@/components/layout/DrawerLeft";
import DrawerRight from "@/components/layout/DrawerRight";
import {genURLImage} from "../../utils/common";
// import NavbarChat from "../menu/NavbarChat";
// import NavbarRentalMenu from "../menu/NavbarRentalMenu";
// import NavbarBuyMenu from "../menu/NavbarBuyMenu";

export default function Navbar() {
  const router = useRouter();
  const profile = useSelector((state) => state.auth.profile);
  const handleLogin = () => {
    const label = document.getElementById("modal-require-login-id");
    label.click();
    router.push(`/sign-in`);
  };
  const handleFavorite = () => {
    if (profile?._id) {
      router.push('/exam/favorites')
    } else {
      const label = document.getElementById("modal-require-login-id");
      label.click();
    }
  };

  const {
    show: showDrawer,
    setShow: setShowDrawer,
    nodeRef,
  } = useClickOutside();

  const {
    show: showDrawerRight,
    setShow: setShowDrawerRight,
    nodeRef: drawerRightRef,
  } = useClickOutside();

  const openDrawerLeft = () => {
    setShowDrawer(true);
  };

  const openDrawerRight = () => {
    setShowDrawerRight(true);
  };

  return (
    <div className={"shadow-lg w-full sticky top-0 z-20 bg-base-100"}>
      <div className="container flex items-center justify-between">
        <div className="lg:px-0 py-3 px-3 h-fit flex justify-between w-full flex-1 ">
          <div className="flex items-center space-x-3">
            <i
              className="fa-regular fa-bars text-primary text-xl cursor-pointer block lg:hidden"
              onClick={openDrawerLeft}
            ></i>
            <Logo/>
          </div>
          <div className="lg:hidden flex space-x-4">
            {profile?._id && (
              <Fragment>
                <li
                  className="h-[32px] w-[32px] flex items-center justify-center rounded-full bg-backgroundGray nav-item font-bold cursor-pointer user-menu">
                  <Notification/>
                </li>
              </Fragment>
            )}
            {profile?.avatar ? (
              <div
                className="h-[32px] w-[32px] relative cursor-pointer "
                onClick={openDrawerRight}
              >
                <Image
                  alt="avatar"
                  layout="fill"
                  objectFit="cover"
                  src={genURLImage(profile.avatar)}
                  className="rounded-full h-full w-full"
                />
              </div>
            ) : (
              <i
                className="fa-light fa-circle-user text-primary text-[32px] block lg:hidden cursor-pointer"
                onClick={openDrawerRight}
              ></i>
            )}
          </div>
        </div>
        <div className="hidden lg:block">
          <ul className="flex items-center gap-x-5">
            <li className="user-menu">
              <NavbarSubjectMenu/>
            </li>
            {/*<li className="user-menu">*/}
            {/*    <NavbarBuyMenu/>*/}
            {/*</li>*/}
            {/*<li className="user-menu">*/}
            {/*    <NavbarRentalMenu/>*/}
            {/*</li>*/}
            <li
              className={`nav-item font-bold cursor-pointer ${
                router.asPath.includes("/toeic")
                  ? "text-primary"
                  : "text-info"
              }`}
              onClick={() => {
                router.push("/toeic");
              }}
            >
              Toeic
            </li>
            <li
              className={`nav-item font-bold cursor-pointer ${
                router.asPath.includes("/documents")
                  ? "text-primary"
                  : "text-info"
              }`}
              onClick={() => {
                router.push("/documents");
              }}
            >
              Tài liệu ôn tập
            </li>
            <li
              className={`nav-item font-bold cursor-pointer ${
                router.asPath.includes("/blog")
                  ? "text-primary"
                  : "text-info"
              }`}
              onClick={() => {
                router.push("/blog");
              }}
            >
              Tin tức
            </li>
            {/*<li className="user-menu nav-item font-bold cursor-pointer text-info">*/}
            {/*    <NavbarSeeMoreMenu/>*/}
            {/*    /!*    tin tức*!/*/}
            {/*</li>*/}
            <li
              className={`nav-item font-bold cursor-pointer ${
                router.pathname === "/about" ? "text-primary" : "text-info"
              }`}
            >
              <Link href={"/about"}>
                <span>Giới thiệu</span>
              </Link>
            </li>

            <div className={'flex space-x-3'}>
              <Fragment>
                <li
                  className="h-[39px] w-[39px] flex items-center justify-center rounded-full bg-backgroundGray font-bold cursor-pointer"
                  onClick={handleFavorite}>
                  <i
                    className={`fa-sharp fa-solid fa-heart text-lg ${router.pathname === "/exam/favorites" ? 'text-[#f9595f]' : 'text-colorIconMenu'}`}></i>
                </li>
              </Fragment>

              {profile?._id && (
                <Fragment>
                  <li
                    className="h-[39px] w-[39px] flex items-center justify-center rounded-full bg-backgroundGray nav-item font-bold cursor-pointer user-menu">
                    <Notification/>
                  </li>
                </Fragment>
              )}
              <li className="nav-item font-bold cursor-pointer user-menu">
                <NavbarUserMenu/>
              </li>
            </div>

            <Fragment>
              {/*{profile?.id ? (*/}
              {/*    <li*/}
              {/*        className="nav-item font-bold cursor-pointer flex items-center space-x-2 bg-primary px-3 py-1 rounded-full"*/}
              {/*        onClick={handleFavorite}*/}
              {/*    >*/}
              {/*        <i className="fa-regular fa-heart text-lg text-white"></i>*/}
              {/*        <span className="text-white">Đề thi yêu thích</span>*/}
              {/*    </li>*/}
              {/*) : (*/}
              {/*    <div className="user-menu">*/}
              {/*        /!*<NavbarPostNew/>*!/*/}
              {/*    </div>*/}
              {/*)}*/}
            </Fragment>
          </ul>
        </div>
      </div>
      <Drawer ref={nodeRef} show={showDrawer} setShow={setShowDrawer}/>
      <DrawerRight
        ref={drawerRightRef}
        show={showDrawerRight}
        setShow={setShowDrawerRight}
      />
      <ModalRequireLogin id={"modal-require-login"} handleClick={handleLogin}/>
    </div>
  );
}
