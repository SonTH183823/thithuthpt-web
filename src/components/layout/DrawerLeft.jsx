import React from "react";
import PropTypes from "prop-types";
import DrawerHeader from "../drawer-menu/drawer-menu-left/DrawerHeader";
import DrawerItem from "../drawer-menu/drawer-menu-left/DrawerItem";

const menu = [
  {
    id: 1,
    title: "Thi ngay",
    children: [
      { id: 1, title: "Toán học" },
      { id: 2, title: "Vật Lý" },
      { id: 3, title: "Hóa Học" },
      { id: 4, title: "Sinh Học" },
      { id: 5, title: "Lịch Sử" },
      { id: 6, title: "Tiếng Anh" },
      { id: 7, title: "Địa Lý" },
      { id: 8, title: "GDCD" },
    ],
  },
  {
    id: 2,
    title: "Toeic",
    path: '/toeic'
  },
  {
    id: 3,
    title: "Tài liệu ôn tập",
    path: '/document'
  },
  {
    id: 5,
    title: "Tin tức",
    path: "/blog",
  },
  {
    id: 4,
    title: "Giới thiệu",
    path: "/about",
  },
  {
    id: 6,
    title: "Xem thêm",
    children: [
      { id: 1, title: "Về TROTOT", path: "/about" },
      { id: 2, title: "Bảng giá dịch vụ", path: "/pricing" },
      { id: 3, title: "FAQ", path: "/faq" },
    ],
  },
];
const Drawer = React.forwardRef(({ show, setShow }, nodeRef) => {
  return (
    <div
      ref={nodeRef}
      className={`w-full h-screen bg-overlay transition-all fixed top-0 bottom-0 ${
        show ? "" : "-translate-x-full"
      }`}
    >
      <div className="w-[80%] md:w-[60%] bg-base-100 h-screen">
        <DrawerHeader />
        <div className="px-2">
          {menu.map((item) => (
            <DrawerItem key={item.id} item={item} setShow={setShow} />
          ))}
        </div>
      </div>
    </div>
  );
});

Drawer.displayName = "Drawer";
Drawer.propTypes = {
  show: PropTypes.bool,
  nodeRef: PropTypes.element,
};
export default Drawer;
