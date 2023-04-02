import React, {useEffect, useState} from "react";
import {Menu, MenuItem, MenuButton} from "@szhsin/react-menu";
import {MenuItem as MyMenuItem} from "./MenuItem";
import {useRouter} from "next/router";

export default function NavbarSubjectMenu() {
    const router = useRouter();
    const [checkURL, setCheckURL] = useState(false);
    // useEffect(() => {
    //     if (router && router.asPath.includes("tradingForm=1")) {
    //         setCheckURL(true);
    //     } else {
    //         setCheckURL(false);
    //     }
    // }, [router]);
    const menu = [
        {
            id: 1,
            title: "Toán Học",
            path: "/subject",
        },
        {id: 2, title: "Vật Lý", path: "/filter?tradingForm=1&category=2"},
        {
            id: 3,
            title: "Hóa Học",
            path: "/filter?tradingForm=1&category=3",
        },
        {id: 4, title: "Sinh Học", path: "/filter?tradingForm=1&category=4"},
        {id: 5, title: "Tiếng Anh", path: "/filter?tradingForm=1&category=4"},
        {id: 6, title: "Lịch Sử", path: "/filter?tradingForm=1&category=4"},
        {id: 7, title: "Địa Lý", path: "/filter?tradingForm=1&category=4"},
        {id: 8, title: "Giáo dục công dân", path: "/filter?tradingForm=1&category=4"},
    ];

    const handleClickMenuItem = (item) => {
        router.push(item.path);
    };

    return (
        <Menu
            menuButton={
                <MenuButton>
                  <span
                      className={`nav-item font-bold cursor-pointer ${
                          router.pathname !== "/" ? "text-primary" : "text-info"
                      }`}
                  >
                    <span className={`${checkURL ? "text-primary" : ""}`}>
                      Thi THPT
                    </span>
                  </span>
                </MenuButton>
            }
            transition
        >
            {menu.map((item) => (
                <MenuItem key={item.id} onClick={() => handleClickMenuItem(item)}>
                    <MyMenuItem title={item.title}/>
                </MenuItem>
            ))}
        </Menu>
    );
}
