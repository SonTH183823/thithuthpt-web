export const menuGuest = [
    {
        id: 1,
        title: "Đăng ký / Đăng nhập",
        icon: "fa-regular fa-user",
        path: "/sign-in",
    },
];

export const menuUser = [
    {
        id: 1,
        title: "Trang cá nhân",
        icon: "fa-regular fa-user",
        path: "/profile/me",
    },
    {
        id: 2,
        title: "Chỉnh sửa thông tin cá nhân",
        icon: "fa-regular fa-pen-to-square",
        path: "/management/profile",
    },
    {
        id: 3,
        title: "Quản lý tin đăng",
        icon: "fa-regular fa-ballot",
        path: "/management/post",
    },
    {
        id: 4,
        title: "Đề thi yêu thích",
        icon: "fa-regular fa-heart",
        path: "/exam/favorites",
    },
    {
        id: 5,
        title: "Nạp tiền vào tài khoản",
        icon: "fa-duotone fa-money-check",
        path: "/deposit",
    },
    {
        id: 115,
        title: "Đăng xuất",
        icon: "fa-regular fa-arrow-right-from-bracket",
        path: "/sign-in",
    },
];

export const categoryTitleConfig = {
    1: "Mới nhất",
    2: "Nổi bật",
    3: "Nâng cao",
    4: "Phòng trọ",
};

export const answerConfig = {
    '0': {
        value: 0,
        label: 'Not answer'
    },
    'A': {
        value: 1,
        label: 'A'
    },
    'B': {
        value: 2,
        label: 'B'
    },
    'C': {
        value: 3,
        label: 'C'
    },
    'D': {
        value: 4,
        label: 'D'
    },
    'Mark': {
        value: 5,
        label: 'Mark'
    },
}