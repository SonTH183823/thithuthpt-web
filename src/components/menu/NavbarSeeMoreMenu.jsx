import * as React from "react";
import {Menu, MenuItem, MenuButton} from "@szhsin/react-menu";
import {MenuItem as MyMenuItem} from "./MenuItem";
import {useRouter} from "next/router";

export default function NavbarSeeMoreMenu() {
    const menu = [
        {id: 1, title: "Giáo dục", path: "/blog?category=education"},
        {id: 2, title: "Tuyển sinh", path: "blog?category=admissions"},
        {id: 3, title: "Kiến thức", path: "/blog?category=knowledge"},
        {id: 4, title: "Tổng hợp", path: "/blog"},
    ];
    const router = useRouter();
    return (
        <Menu
            menuButton={
                <MenuButton>
          <span
              className={`nav-item font-bold cursor-pointer ${
                  router.asPath.includes("/blog")
                      ? "text-primary"
                      : "text-info"
              }`}
          >
            Tin tức
          </span>
                </MenuButton>
            }
            transition
        >
            {menu.map((item) => (
                <MenuItem key={item.id}>
                    <MyMenuItem title={item.title} path={item.path}/>
                </MenuItem>
            ))}
        </Menu>
    );
}
