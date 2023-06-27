import commentIcon from '../assets/images/svg/comment1.svg'
import awards from '../assets/images/svg/awards.svg'
import like from  '../assets/images/svg/like.svg'
import dislike from  '../assets/images/svg/dislike.svg'

export const menuGuest = [
  {
    id: 1,
    title: "Đăng ký / Đăng nhập",
    icon: "fa-regular fa-user",
    path: "/sign-in",
  },
];

export const domainUpload = process.env.NEXT_PUBLIC_API_UPLOAD || "http://localhost:8003" + "/uploads";

export const xapSepConfig = [
  {
    value: 1,
    label: 'Mới nhất'
  },
  {
    value: 2,
    label: 'Nổi bật'
  }
]

export const subjectArrConfig = [
  {
    value: 1,
    label: 'Toán Học'
  },
  {
    value: 2,
    label: 'Vật Lý'
  },
  {
    value: 3,
    label: 'Hóa Học'
  },
  {
    value: 4,
    label: 'Sinh Học'
  },
  {
    value: 5,
    label: 'Tiếng Anh'
  },
  {
    value: 6,
    label: 'Lịch Sử'
  },
  {
    value: 7,
    label: 'Địa Lý'
  },
  {
    value: 8,
    label: 'GDCD'
  },
  {
    value: 9,
    label: 'Toeic'
  }
]

export const sortHistoryConfig = [
  {
    value: 1,
    label: 'Mới nhất'
  },
  {
    value: 2,
    label: 'Cũ nhất'
  },
  // {
  //   value: 3,
  //   label: 'Điểm cao nhất'
  // }
]

export const iconLib = {
  1: {
    label: 'Bình luận',
    icon: commentIcon
  },
  2: {
    label: 'Điểm Carpla',
    icon: awards
  },
  3:{
    label: 'Thích',
    icon: like
  },
  4: {
    label: 'Không thích',
    icon: dislike
  }
}
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
    id: 5,
    title: "Danh sách yêu thích",
    icon: "fa-regular fa-heart",
    path: "/exam/favorites",
  },
  // {
  //   id: 4,
  //   title: "Nạp tiền vào tài khoản",
  //   icon: "fa-duotone fa-money-check",
  //   path: "/deposit",
  // },
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
};

export const categoryConfig = [
  {id: 1, title: "Căn hộ/Chung cư", isChecked: false},
  {id: 2, title: "Nhà ở", isChecked: false},
  {id: 3, title: "Văn phòng/Mặt bằng kinh doanh", isChecked: false},
  {id: 4, title: "Phòng trọ", isChecked: false},
];

export const tradingFormConfig = {
  BUY_SELL: 2,
  FOR_RENTAL: 1,
  RENTAL: 3,
  ROOM_MATE: 4,
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
};

export const answerConfigArr = [
  {
    value: 0,
    label: 'Not answer'
  },
  {
    value: 1,
    label: 'A'
  },
  {
    value: 2,
    label: 'B'
  },
  {
    value: 3,
    label: 'C'
  },
  {
    value: 4,
    label: 'D'
  },
]

export const provincesConfig = {
  1: "Thành phố Hà Nội",
  2: "Tỉnh Hà Giang",
  4: "Tỉnh Cao Bằng",
  6: "Tỉnh Bắc Kạn",
  8: "Tỉnh Tuyên Quang",
  10: "Tỉnh Lào Cai",
  11: "Tỉnh Điện Biên",
  12: "Tỉnh Lai Châu",
  14: "Tỉnh Sơn La",
  15: "Tỉnh Yên Bái",
  17: "Tỉnh Hoà Bình",
  19: "Tỉnh Thái Nguyên",
  20: "Tỉnh Lạng Sơn",
  22: "Tỉnh Quảng Ninh",
  24: "Tỉnh Bắc Giang",
  25: "Tỉnh Phú Thọ",
  26: "Tỉnh Vĩnh Phúc",
  27: "Tỉnh Bắc Ninh",
  30: "Tỉnh Hải Dương",
  31: "Thành phố Hải Phòng",
  33: "Tỉnh Hưng Yên",
  34: "Tỉnh Thái Bình",
  35: "Tỉnh Hà Nam",
  36: "Tỉnh Nam Định",
  37: "Tỉnh Ninh Bình",
  38: "Tỉnh Thanh Hóa",
  40: "Tỉnh Nghệ An",
  42: "Tỉnh Hà Tĩnh",
  44: "Tỉnh Quảng Bình",
  45: "Tỉnh Quảng Trị",
  46: "Tỉnh Thừa Thiên Huế",
  48: "Thành phố Đà Nẵng",
  49: "Tỉnh Quảng Nam",
  51: "Tỉnh Quảng Ngãi",
  52: "Tỉnh Bình Định",
  54: "Tỉnh Phú Yên",
  56: "Tỉnh Khánh Hòa",
  58: "Tỉnh Ninh Thuận",
  60: "Tỉnh Bình Thuận",
  62: "Tỉnh Kon Tum",
  64: "Tỉnh Gia Lai",
  66: "Tỉnh Đắk Lắk",
  67: "Tỉnh Đắk Nông",
  68: "Tỉnh Lâm Đồng",
  70: "Tỉnh Bình Phước",
  72: "Tỉnh Tây Ninh",
  74: "Tỉnh Bình Dương",
  75: "Tỉnh Đồng Nai",
  77: "Tỉnh Bà Rịa - Vũng Tàu",
  79: "Thành phố Hồ Chí Minh",
  80: "Tỉnh Long An",
  82: "Tỉnh Tiền Giang",
  83: "Tỉnh Bến Tre",
  84: "Tỉnh Trà Vinh",
  86: "Tỉnh Vĩnh Long",
  87: "Tỉnh Đồng Tháp",
  89: "Tỉnh An Giang",
  91: "Tỉnh Kiên Giang",
  92: "Thành phố Cần Thơ",
  93: "Tỉnh Hậu Giang",
  94: "Tỉnh Sóc Trăng",
  95: "Tỉnh Bạc Liêu",
  96: "Tỉnh Cà Mau",
};

export const districtsConfig = {
  1: "Quận Ba Đình",
  2: "Quận Hoàn Kiếm",
  3: "Quận Tây Hồ",
  4: "Quận Long Biên",
  5: "Quận Cầu Giấy",
  6: "Quận Đống Đa",
  7: "Quận Hai Bà Trưng",
  8: "Quận Hoàng Mai",
  9: "Quận Thanh Xuân",
  16: "Huyện Sóc Sơn",
  17: "Huyện Đông Anh",
  18: "Huyện Gia Lâm",
  19: "Quận Nam Từ Liêm",
  20: "Huyện Thanh Trì",
  21: "Quận Bắc Từ Liêm",
  24: "Thành phố Hà Giang",
  26: "Huyện Đồng Văn",
  27: "Huyện Mèo Vạc",
  28: "Huyện Yên Minh",
  29: "Huyện Quản Bạ",
  30: "Huyện Vị Xuyên",
  31: "Huyện Bắc Mê",
  32: "Huyện Hoàng Su Phì",
  33: "Huyện Xín Mần",
  34: "Huyện Bắc Quang",
  35: "Huyện Quang Bình",
  40: "Thành phố Cao Bằng",
  42: "Huyện Bảo Lâm",
  43: "Huyện Bảo Lạc",
  45: "Huyện Hà Quảng",
  47: "Huyện Trùng Khánh",
  48: "Huyện Hạ Lang",
  49: "Huyện Quảng Hòa",
  51: "Huyện Hoà An",
  52: "Huyện Nguyên Bình",
  53: "Huyện Thạch An",
  58: "Thành Phố Bắc Kạn",
  60: "Huyện Pác Nặm",
  61: "Huyện Ba Bể",
  62: "Huyện Ngân Sơn",
  63: "Huyện Bạch Thông",
  64: "Huyện Chợ Đồn",
  65: "Huyện Chợ Mới",
  66: "Huyện Na Rì",
  70: "Thành phố Tuyên Quang",
  71: "Huyện Lâm Bình",
  72: "Huyện Na Hang",
  73: "Huyện Chiêm Hóa",
  74: "Huyện Hàm Yên",
  75: "Huyện Yên Sơn",
  76: "Huyện Sơn Dương",
  80: "Thành phố Lào Cai",
  82: "Huyện Bát Xát",
  83: "Huyện Mường Khương",
  84: "Huyện Si Ma Cai",
  85: "Huyện Bắc Hà",
  86: "Huyện Bảo Thắng",
  87: "Huyện Bảo Yên",
  88: "Thị xã Sa Pa",
  89: "Huyện Văn Bàn",
  94: "Thành phố Điện Biên Phủ",
  95: "Thị Xã Mường Lay",
  96: "Huyện Mường Nhé",
  97: "Huyện Mường Chà",
  98: "Huyện Tủa Chùa",
  99: "Huyện Tuần Giáo",
  100: "Huyện Điện Biên",
  101: "Huyện Điện Biên Đông",
  102: "Huyện Mường Ảng",
  103: "Huyện Nậm Pồ",
  105: "Thành phố Lai Châu",
  106: "Huyện Tam Đường",
  107: "Huyện Mường Tè",
  108: "Huyện Sìn Hồ",
  109: "Huyện Phong Thổ",
  110: "Huyện Than Uyên",
  111: "Huyện Tân Uyên",
  112: "Huyện Nậm Nhùn",
  116: "Thành phố Sơn La",
  118: "Huyện Quỳnh Nhai",
  119: "Huyện Thuận Châu",
  120: "Huyện Mường La",
  121: "Huyện Bắc Yên",
  122: "Huyện Phù Yên",
  123: "Huyện Mộc Châu",
  124: "Huyện Yên Châu",
  125: "Huyện Mai Sơn",
  126: "Huyện Sông Mã",
  127: "Huyện Sốp Cộp",
  128: "Huyện Vân Hồ",
  132: "Thành phố Yên Bái",
  133: "Thị xã Nghĩa Lộ",
  135: "Huyện Lục Yên",
  136: "Huyện Văn Yên",
  137: "Huyện Mù Căng Chải",
  138: "Huyện Trấn Yên",
  139: "Huyện Trạm Tấu",
  140: "Huyện Văn Chấn",
  141: "Huyện Yên Bình",
  148: "Thành phố Hòa Bình",
  150: "Huyện Đà Bắc",
  152: "Huyện Lương Sơn",
  153: "Huyện Kim Bôi",
  154: "Huyện Cao Phong",
  155: "Huyện Tân Lạc",
  156: "Huyện Mai Châu",
  157: "Huyện Lạc Sơn",
  158: "Huyện Yên Thủy",
  159: "Huyện Lạc Thủy",
  164: "Thành phố Thái Nguyên",
  165: "Thành phố Sông Công",
  167: "Huyện Định Hóa",
  168: "Huyện Phú Lương",
  169: "Huyện Đồng Hỷ",
  170: "Huyện Võ Nhai",
  171: "Huyện Đại Từ",
  172: "Thành phố Phổ Yên",
  173: "Huyện Phú Bình",
  178: "Thành phố Lạng Sơn",
  180: "Huyện Tràng Định",
  181: "Huyện Bình Gia",
  182: "Huyện Văn Lãng",
  183: "Huyện Cao Lộc",
  184: "Huyện Văn Quan",
  185: "Huyện Bắc Sơn",
  186: "Huyện Hữu Lũng",
  187: "Huyện Chi Lăng",
  188: "Huyện Lộc Bình",
  189: "Huyện Đình Lập",
  193: "Thành phố Hạ Long",
  194: "Thành phố Móng Cái",
  195: "Thành phố Cẩm Phả",
  196: "Thành phố Uông Bí",
  198: "Huyện Bình Liêu",
  199: "Huyện Tiên Yên",
  200: "Huyện Đầm Hà",
  201: "Huyện Hải Hà",
  202: "Huyện Ba Chẽ",
  203: "Huyện Vân Đồn",
  205: "Thị xã Đông Triều",
  206: "Thị xã Quảng Yên",
  207: "Huyện Cô Tô",
  213: "Thành phố Bắc Giang",
  215: "Huyện Yên Thế",
  216: "Huyện Tân Yên",
  217: "Huyện Lạng Giang",
  218: "Huyện Lục Nam",
  219: "Huyện Lục Ngạn",
  220: "Huyện Sơn Động",
  221: "Huyện Yên Dũng",
  222: "Huyện Việt Yên",
  223: "Huyện Hiệp Hòa",
  227: "Thành phố Việt Trì",
  228: "Thị xã Phú Thọ",
  230: "Huyện Đoan Hùng",
  231: "Huyện Hạ Hoà",
  232: "Huyện Thanh Ba",
  233: "Huyện Phù Ninh",
  234: "Huyện Yên Lập",
  235: "Huyện Cẩm Khê",
  236: "Huyện Tam Nông",
  237: "Huyện Lâm Thao",
  238: "Huyện Thanh Sơn",
  239: "Huyện Thanh Thuỷ",
  240: "Huyện Tân Sơn",
  243: "Thành phố Vĩnh Yên",
  244: "Thành phố Phúc Yên",
  246: "Huyện Lập Thạch",
  247: "Huyện Tam Dương",
  248: "Huyện Tam Đảo",
  249: "Huyện Bình Xuyên",
  250: "Huyện Mê Linh",
  251: "Huyện Yên Lạc",
  252: "Huyện Vĩnh Tường",
  253: "Huyện Sông Lô",
  256: "Thành phố Bắc Ninh",
  258: "Huyện Yên Phong",
  259: "Huyện Quế Võ",
  260: "Huyện Tiên Du",
  261: "Thành phố Từ Sơn",
  262: "Huyện Thuận Thành",
  263: "Huyện Gia Bình",
  264: "Huyện Lương Tài",
  268: "Quận Hà Đông",
  269: "Thị xã Sơn Tây",
  271: "Huyện Ba Vì",
  272: "Huyện Phúc Thọ",
  273: "Huyện Đan Phượng",
  274: "Huyện Hoài Đức",
  275: "Huyện Quốc Oai",
  276: "Huyện Thạch Thất",
  277: "Huyện Chương Mỹ",
  278: "Huyện Thanh Oai",
  279: "Huyện Thường Tín",
  280: "Huyện Phú Xuyên",
  281: "Huyện Ứng Hòa",
  282: "Huyện Mỹ Đức",
  288: "Thành phố Hải Dương",
  290: "Thành phố Chí Linh",
  291: "Huyện Nam Sách",
  292: "Thị xã Kinh Môn",
  293: "Huyện Kim Thành",
  294: "Huyện Thanh Hà",
  295: "Huyện Cẩm Giàng",
  296: "Huyện Bình Giang",
  297: "Huyện Gia Lộc",
  298: "Huyện Tứ Kỳ",
  299: "Huyện Ninh Giang",
  300: "Huyện Thanh Miện",
  303: "Quận Hồng Bàng",
  304: "Quận Ngô Quyền",
  305: "Quận Lê Chân",
  306: "Quận Hải An",
  307: "Quận Kiến An",
  308: "Quận Đồ Sơn",
  309: "Quận Dương Kinh",
  311: "Huyện Thuỷ Nguyên",
  312: "Huyện An Dương",
  313: "Huyện An Lão",
  314: "Huyện Kiến Thuỵ",
  315: "Huyện Tiên Lãng",
  316: "Huyện Vĩnh Bảo",
  317: "Huyện Cát Hải",
  318: "Huyện Bạch Long Vĩ",
  323: "Thành phố Hưng Yên",
  325: "Huyện Văn Lâm",
  326: "Huyện Văn Giang",
  327: "Huyện Yên Mỹ",
  328: "Thị xã Mỹ Hào",
  329: "Huyện Ân Thi",
  330: "Huyện Khoái Châu",
  331: "Huyện Kim Động",
  332: "Huyện Tiên Lữ",
  333: "Huyện Phù Cừ",
  336: "Thành phố Thái Bình",
  338: "Huyện Quỳnh Phụ",
  339: "Huyện Hưng Hà",
  340: "Huyện Đông Hưng",
  341: "Huyện Thái Thụy",
  342: "Huyện Tiền Hải",
  343: "Huyện Kiến Xương",
  344: "Huyện Vũ Thư",
  347: "Thành phố Phủ Lý",
  349: "Thị xã Duy Tiên",
  350: "Huyện Kim Bảng",
  351: "Huyện Thanh Liêm",
  352: "Huyện Bình Lục",
  353: "Huyện Lý Nhân",
  356: "Thành phố Nam Định",
  358: "Huyện Mỹ Lộc",
  359: "Huyện Vụ Bản",
  360: "Huyện Ý Yên",
  361: "Huyện Nghĩa Hưng",
  362: "Huyện Nam Trực",
  363: "Huyện Trực Ninh",
  364: "Huyện Xuân Trường",
  365: "Huyện Giao Thủy",
  366: "Huyện Hải Hậu",
  369: "Thành phố Ninh Bình",
  370: "Thành phố Tam Điệp",
  372: "Huyện Nho Quan",
  373: "Huyện Gia Viễn",
  374: "Huyện Hoa Lư",
  375: "Huyện Yên Khánh",
  376: "Huyện Kim Sơn",
  377: "Huyện Yên Mô",
  380: "Thành phố Thanh Hóa",
  381: "Thị xã Bỉm Sơn",
  382: "Thành phố Sầm Sơn",
  384: "Huyện Mường Lát",
  385: "Huyện Quan Hóa",
  386: "Huyện Bá Thước",
  387: "Huyện Quan Sơn",
  388: "Huyện Lang Chánh",
  389: "Huyện Ngọc Lặc",
  390: "Huyện Cẩm Thủy",
  391: "Huyện Thạch Thành",
  392: "Huyện Hà Trung",
  393: "Huyện Vĩnh Lộc",
  394: "Huyện Yên Định",
  395: "Huyện Thọ Xuân",
  396: "Huyện Thường Xuân",
  397: "Huyện Triệu Sơn",
  398: "Huyện Thiệu Hóa",
  399: "Huyện Hoằng Hóa",
  400: "Huyện Hậu Lộc",
  401: "Huyện Nga Sơn",
  402: "Huyện Như Xuân",
  403: "Huyện Như Thanh",
  404: "Huyện Nông Cống",
  405: "Huyện Đông Sơn",
  406: "Huyện Quảng Xương",
  407: "Thị xã Nghi Sơn",
  412: "Thành phố Vinh",
  413: "Thị xã Cửa Lò",
  414: "Thị xã Thái Hoà",
  415: "Huyện Quế Phong",
  416: "Huyện Quỳ Châu",
  417: "Huyện Kỳ Sơn",
  418: "Huyện Tương Dương",
  419: "Huyện Nghĩa Đàn",
  420: "Huyện Quỳ Hợp",
  421: "Huyện Quỳnh Lưu",
  422: "Huyện Con Cuông",
  423: "Huyện Tân Kỳ",
  424: "Huyện Anh Sơn",
  425: "Huyện Diễn Châu",
  426: "Huyện Yên Thành",
  427: "Huyện Đô Lương",
  428: "Huyện Thanh Chương",
  429: "Huyện Nghi Lộc",
  430: "Huyện Nam Đàn",
  431: "Huyện Hưng Nguyên",
  432: "Thị xã Hoàng Mai",
  436: "Thành phố Hà Tĩnh",
  437: "Thị xã Hồng Lĩnh",
  439: "Huyện Hương Sơn",
  440: "Huyện Đức Thọ",
  441: "Huyện Vũ Quang",
  442: "Huyện Nghi Xuân",
  443: "Huyện Can Lộc",
  444: "Huyện Hương Khê",
  445: "Huyện Thạch Hà",
  446: "Huyện Cẩm Xuyên",
  447: "Huyện Kỳ Anh",
  448: "Huyện Lộc Hà",
  449: "Thị xã Kỳ Anh",
  450: "Thành Phố Đồng Hới",
  452: "Huyện Minh Hóa",
  453: "Huyện Tuyên Hóa",
  454: "Huyện Quảng Trạch",
  455: "Huyện Bố Trạch",
  456: "Huyện Quảng Ninh",
  457: "Huyện Lệ Thủy",
  458: "Thị xã Ba Đồn",
  461: "Thành phố Đông Hà",
  462: "Thị xã Quảng Trị",
  464: "Huyện Vĩnh Linh",
  465: "Huyện Hướng Hóa",
  466: "Huyện Gio Linh",
  467: "Huyện Đa Krông",
  468: "Huyện Cam Lộ",
  469: "Huyện Triệu Phong",
  470: "Huyện Hải Lăng",
  471: "Huyện Cồn Cỏ",
  474: "Thành phố Huế",
  476: "Huyện Phong Điền",
  477: "Huyện Quảng Điền",
  478: "Huyện Phú Vang",
  479: "Thị xã Hương Thủy",
  480: "Thị xã Hương Trà",
  481: "Huyện A Lưới",
  482: "Huyện Phú Lộc",
  483: "Huyện Nam Đông",
  490: "Quận Liên Chiểu",
  491: "Quận Thanh Khê",
  492: "Quận Hải Châu",
  493: "Quận Sơn Trà",
  494: "Quận Ngũ Hành Sơn",
  495: "Quận Cẩm Lệ",
  497: "Huyện Hòa Vang",
  498: "Huyện Hoàng Sa",
  502: "Thành phố Tam Kỳ",
  503: "Thành phố Hội An",
  504: "Huyện Tây Giang",
  505: "Huyện Đông Giang",
  506: "Huyện Đại Lộc",
  507: "Thị xã Điện Bàn",
  508: "Huyện Duy Xuyên",
  509: "Huyện Quế Sơn",
  510: "Huyện Nam Giang",
  511: "Huyện Phước Sơn",
  512: "Huyện Hiệp Đức",
  513: "Huyện Thăng Bình",
  514: "Huyện Tiên Phước",
  515: "Huyện Bắc Trà My",
  516: "Huyện Nam Trà My",
  517: "Huyện Núi Thành",
  518: "Huyện Phú Ninh",
  519: "Huyện Nông Sơn",
  522: "Thành phố Quảng Ngãi",
  524: "Huyện Bình Sơn",
  525: "Huyện Trà Bồng",
  527: "Huyện Sơn Tịnh",
  528: "Huyện Tư Nghĩa",
  529: "Huyện Sơn Hà",
  530: "Huyện Sơn Tây",
  531: "Huyện Minh Long",
  532: "Huyện Nghĩa Hành",
  533: "Huyện Mộ Đức",
  534: "Thị xã Đức Phổ",
  535: "Huyện Ba Tơ",
  536: "Huyện Lý Sơn",
  540: "Thành phố Quy Nhơn",
  542: "Huyện An Lão",
  543: "Thị xã Hoài Nhơn",
  544: "Huyện Hoài Ân",
  545: "Huyện Phù Mỹ",
  546: "Huyện Vĩnh Thạnh",
  547: "Huyện Tây Sơn",
  548: "Huyện Phù Cát",
  549: "Thị xã An Nhơn",
  550: "Huyện Tuy Phước",
  551: "Huyện Vân Canh",
  555: "Thành phố Tuy Hoà",
  557: "Thị xã Sông Cầu",
  558: "Huyện Đồng Xuân",
  559: "Huyện Tuy An",
  560: "Huyện Sơn Hòa",
  561: "Huyện Sông Hinh",
  562: "Huyện Tây Hoà",
  563: "Huyện Phú Hoà",
  564: "Thị xã Đông Hòa",
  568: "Thành phố Nha Trang",
  569: "Thành phố Cam Ranh",
  570: "Huyện Cam Lâm",
  571: "Huyện Vạn Ninh",
  572: "Thị xã Ninh Hòa",
  573: "Huyện Khánh Vĩnh",
  574: "Huyện Diên Khánh",
  575: "Huyện Khánh Sơn",
  576: "Huyện Trường Sa",
  582: "Thành phố Phan Rang-Tháp Chàm",
  584: "Huyện Bác Ái",
  585: "Huyện Ninh Sơn",
  586: "Huyện Ninh Hải",
  587: "Huyện Ninh Phước",
  588: "Huyện Thuận Bắc",
  589: "Huyện Thuận Nam",
  593: "Thành phố Phan Thiết",
  594: "Thị xã La Gi",
  595: "Huyện Tuy Phong",
  596: "Huyện Bắc Bình",
  597: "Huyện Hàm Thuận Bắc",
  598: "Huyện Hàm Thuận Nam",
  599: "Huyện Tánh Linh",
  600: "Huyện Đức Linh",
  601: "Huyện Hàm Tân",
  602: "Huyện Phú Quí",
  608: "Thành phố Kon Tum",
  610: "Huyện Đắk Glei",
  611: "Huyện Ngọc Hồi",
  612: "Huyện Đắk Tô",
  613: "Huyện Kon Plông",
  614: "Huyện Kon Rẫy",
  615: "Huyện Đắk Hà",
  616: "Huyện Sa Thầy",
  617: "Huyện Tu Mơ Rông",
  618: "Huyện Ia H' Drai",
  622: "Thành phố Pleiku",
  623: "Thị xã An Khê",
  624: "Thị xã Ayun Pa",
  625: "Huyện KBang",
  626: "Huyện Đăk Đoa",
  627: "Huyện Chư Păh",
  628: "Huyện Ia Grai",
  629: "Huyện Mang Yang",
  630: "Huyện Kông Chro",
  631: "Huyện Đức Cơ",
  632: "Huyện Chư Prông",
  633: "Huyện Chư Sê",
  634: "Huyện Đăk Pơ",
  635: "Huyện Ia Pa",
  637: "Huyện Krông Pa",
  638: "Huyện Phú Thiện",
  639: "Huyện Chư Pưh",
  643: "Thành phố Buôn Ma Thuột",
  644: "Thị Xã Buôn Hồ",
  645: "Huyện Ea H'leo",
  646: "Huyện Ea Súp",
  647: "Huyện Buôn Đôn",
  648: "Huyện Cư M'gar",
  649: "Huyện Krông Búk",
  650: "Huyện Krông Năng",
  651: "Huyện Ea Kar",
  652: "Huyện M'Đrắk",
  653: "Huyện Krông Bông",
  654: "Huyện Krông Pắc",
  655: "Huyện Krông A Na",
  656: "Huyện Lắk",
  657: "Huyện Cư Kuin",
  660: "Thành phố Gia Nghĩa",
  661: "Huyện Đăk Glong",
  662: "Huyện Cư Jút",
  663: "Huyện Đắk Mil",
  664: "Huyện Krông Nô",
  665: "Huyện Đắk Song",
  666: "Huyện Đắk R'Lấp",
  667: "Huyện Tuy Đức",
  672: "Thành phố Đà Lạt",
  673: "Thành phố Bảo Lộc",
  674: "Huyện Đam Rông",
  675: "Huyện Lạc Dương",
  676: "Huyện Lâm Hà",
  677: "Huyện Đơn Dương",
  678: "Huyện Đức Trọng",
  679: "Huyện Di Linh",
  680: "Huyện Bảo Lâm",
  681: "Huyện Đạ Huoai",
  682: "Huyện Đạ Tẻh",
  683: "Huyện Cát Tiên",
  688: "Thị xã Phước Long",
  689: "Thành phố Đồng Xoài",
  690: "Thị xã Bình Long",
  691: "Huyện Bù Gia Mập",
  692: "Huyện Lộc Ninh",
  693: "Huyện Bù Đốp",
  694: "Huyện Hớn Quản",
  695: "Huyện Đồng Phú",
  696: "Huyện Bù Đăng",
  697: "Thị xã Chơn Thành",
  698: "Huyện Phú Riềng",
  703: "Thành phố Tây Ninh",
  705: "Huyện Tân Biên",
  706: "Huyện Tân Châu",
  707: "Huyện Dương Minh Châu",
  708: "Huyện Châu Thành",
  709: "Thị xã Hòa Thành",
  710: "Huyện Gò Dầu",
  711: "Huyện Bến Cầu",
  712: "Thị xã Trảng Bàng",
  718: "Thành phố Thủ Dầu Một",
  719: "Huyện Bàu Bàng",
  720: "Huyện Dầu Tiếng",
  721: "Thị xã Bến Cát",
  722: "Huyện Phú Giáo",
  723: "Thị xã Tân Uyên",
  724: "Thành phố Dĩ An",
  725: "Thành phố Thuận An",
  726: "Huyện Bắc Tân Uyên",
  731: "Thành phố Biên Hòa",
  732: "Thành phố Long Khánh",
  734: "Huyện Tân Phú",
  735: "Huyện Vĩnh Cửu",
  736: "Huyện Định Quán",
  737: "Huyện Trảng Bom",
  738: "Huyện Thống Nhất",
  739: "Huyện Cẩm Mỹ",
  740: "Huyện Long Thành",
  741: "Huyện Xuân Lộc",
  742: "Huyện Nhơn Trạch",
  747: "Thành phố Vũng Tàu",
  748: "Thành phố Bà Rịa",
  750: "Huyện Châu Đức",
  751: "Huyện Xuyên Mộc",
  752: "Huyện Long Điền",
  753: "Huyện Đất Đỏ",
  754: "Thị xã Phú Mỹ",
  755: "Huyện Côn Đảo",
  760: "Quận 1",
  761: "Quận 12",
  764: "Quận Gò Vấp",
  765: "Quận Bình Thạnh",
  766: "Quận Tân Bình",
  767: "Quận Tân Phú",
  768: "Quận Phú Nhuận",
  769: "Thành phố Thủ Đức",
  770: "Quận 3",
  771: "Quận 10",
  772: "Quận 11",
  773: "Quận 4",
  774: "Quận 5",
  775: "Quận 6",
  776: "Quận 8",
  777: "Quận Bình Tân",
  778: "Quận 7",
  783: "Huyện Củ Chi",
  784: "Huyện Hóc Môn",
  785: "Huyện Bình Chánh",
  786: "Huyện Nhà Bè",
  787: "Huyện Cần Giờ",
  794: "Thành phố Tân An",
  795: "Thị xã Kiến Tường",
  796: "Huyện Tân Hưng",
  797: "Huyện Vĩnh Hưng",
  798: "Huyện Mộc Hóa",
  799: "Huyện Tân Thạnh",
  800: "Huyện Thạnh Hóa",
  801: "Huyện Đức Huệ",
  802: "Huyện Đức Hòa",
  803: "Huyện Bến Lức",
  804: "Huyện Thủ Thừa",
  805: "Huyện Tân Trụ",
  806: "Huyện Cần Đước",
  807: "Huyện Cần Giuộc",
  808: "Huyện Châu Thành",
  815: "Thành phố Mỹ Tho",
  816: "Thị xã Gò Công",
  817: "Thị xã Cai Lậy",
  818: "Huyện Tân Phước",
  819: "Huyện Cái Bè",
  820: "Huyện Cai Lậy",
  821: "Huyện Châu Thành",
  822: "Huyện Chợ Gạo",
  823: "Huyện Gò Công Tây",
  824: "Huyện Gò Công Đông",
  825: "Huyện Tân Phú Đông",
  829: "Thành phố Bến Tre",
  831: "Huyện Châu Thành",
  832: "Huyện Chợ Lách",
  833: "Huyện Mỏ Cày Nam",
  834: "Huyện Giồng Trôm",
  835: "Huyện Bình Đại",
  836: "Huyện Ba Tri",
  837: "Huyện Thạnh Phú",
  838: "Huyện Mỏ Cày Bắc",
  842: "Thành phố Trà Vinh",
  844: "Huyện Càng Long",
  845: "Huyện Cầu Kè",
  846: "Huyện Tiểu Cần",
  847: "Huyện Châu Thành",
  848: "Huyện Cầu Ngang",
  849: "Huyện Trà Cú",
  850: "Huyện Duyên Hải",
  851: "Thị xã Duyên Hải",
  855: "Thành phố Vĩnh Long",
  857: "Huyện Long Hồ",
  858: "Huyện Mang Thít",
  859: "Huyện  Vũng Liêm",
  860: "Huyện Tam Bình",
  861: "Thị xã Bình Minh",
  862: "Huyện Trà Ôn",
  863: "Huyện Bình Tân",
  866: "Thành phố Cao Lãnh",
  867: "Thành phố Sa Đéc",
  868: "Thành phố Hồng Ngự",
  869: "Huyện Tân Hồng",
  870: "Huyện Hồng Ngự",
  871: "Huyện Tam Nông",
  872: "Huyện Tháp Mười",
  873: "Huyện Cao Lãnh",
  874: "Huyện Thanh Bình",
  875: "Huyện Lấp Vò",
  876: "Huyện Lai Vung",
  877: "Huyện Châu Thành",
  883: "Thành phố Long Xuyên",
  884: "Thành phố Châu Đốc",
  886: "Huyện An Phú",
  887: "Thị xã Tân Châu",
  888: "Huyện Phú Tân",
  889: "Huyện Châu Phú",
  890: "Huyện Tịnh Biên",
  891: "Huyện Tri Tôn",
  892: "Huyện Châu Thành",
  893: "Huyện Chợ Mới",
  894: "Huyện Thoại Sơn",
  899: "Thành phố Rạch Giá",
  900: "Thành phố Hà Tiên",
  902: "Huyện Kiên Lương",
  903: "Huyện Hòn Đất",
  904: "Huyện Tân Hiệp",
  905: "Huyện Châu Thành",
  906: "Huyện Giồng Riềng",
  907: "Huyện Gò Quao",
  908: "Huyện An Biên",
  909: "Huyện An Minh",
  910: "Huyện Vĩnh Thuận",
  911: "Thành phố Phú Quốc",
  912: "Huyện Kiên Hải",
  913: "Huyện U Minh Thượng",
  914: "Huyện Giang Thành",
  916: "Quận Ninh Kiều",
  917: "Quận Ô Môn",
  918: "Quận Bình Thuỷ",
  919: "Quận Cái Răng",
  923: "Quận Thốt Nốt",
  924: "Huyện Vĩnh Thạnh",
  925: "Huyện Cờ Đỏ",
  926: "Huyện Phong Điền",
  927: "Huyện Thới Lai",
  930: "Thành phố Vị Thanh",
  931: "Thành phố Ngã Bảy",
  932: "Huyện Châu Thành A",
  933: "Huyện Châu Thành",
  934: "Huyện Phụng Hiệp",
  935: "Huyện Vị Thuỷ",
  936: "Huyện Long Mỹ",
  937: "Thị xã Long Mỹ",
  941: "Thành phố Sóc Trăng",
  942: "Huyện Châu Thành",
  943: "Huyện Kế Sách",
  944: "Huyện Mỹ Tú",
  945: "Huyện Cù Lao Dung",
  946: "Huyện Long Phú",
  947: "Huyện Mỹ Xuyên",
  948: "Thị xã Ngã Năm",
  949: "Huyện Thạnh Trị",
  950: "Thị xã Vĩnh Châu",
  951: "Huyện Trần Đề",
  954: "Thành phố Bạc Liêu",
  956: "Huyện Hồng Dân",
  957: "Huyện Phước Long",
  958: "Huyện Vĩnh Lợi",
  959: "Thị xã Giá Rai",
  960: "Huyện Đông Hải",
  961: "Huyện Hoà Bình",
  964: "Thành phố Cà Mau",
  966: "Huyện U Minh",
  967: "Huyện Thới Bình",
  968: "Huyện Trần Văn Thời",
  969: "Huyện Cái Nước",
  970: "Huyện Đầm Dơi",
  971: "Huyện Năm Căn",
  972: "Huyện Phú Tân",
  973: "Huyện Ngọc Hiển",
};

export const subjectConfig = {
  'toan': {
    value: 1,
    label: 'Toán Học'
  },
  'ly': {
    value: 2,
    label: 'Vật Lý'
  },
  'hoa': {
    value: 3,
    label: 'Hóa Học'
  },
  'sinh': {
    value: 4,
    label: 'Sinh Học'
  },
  'anh': {
    value: 5,
    label: 'Tiếng Anh'
  },
  'su': {
    value: 6,
    label: 'Lịch Sử'
  },
  'dia': {
    value: 7,
    label: 'Địa Lý'
  },
  'gdcd': {
    value: 8,
    label: 'GDCD'
  },
}


export const levelConfig = [
  {
    value: 1,
    label: 'Cơ bản'
  },
  {
    value: 2,
    label: 'Trung bình'
  },
  {
    value: 3,
    label: 'Nâng cao'
  },
  {
    value: 4,
    label: 'Khó'
  }
]

export const awardsConfig = [
  {
    minimumLevel: 0,
    title: "Dự bị"
  },
  {
    minimumLevel: 100,
    title: "Đội 1"
  },
  {
    minimumLevel: 200,
    title: "Lão tướng"
  },
  {
    minimumLevel: 300,
    title: "Huấn luyện viên"
  },
  {
    minimumLevel: 500,
    title: "Captain"
  }
]

export const reasonReportExamOptions = [
  {
    id: 1,
    title: "Nội dung đề thi có vấn đề",
    isChecked: false,
  },
  {
    id: 2,
    title: "Vi phạm bản quyền",
    isChecked: false,
  },
  {
    id: 3,
    title: "Lừa đảo",
    isChecked: false,
  },
  {
    id: 4,
    title: "Cấu trúc đề thi chưa chuẩn",
    isChecked: false,
  },
  {
    id: 5,
    title: "Khác",
    isChecked: false,
  },
]

export const reasonReportQuestionOptions = [
  {
    id: 1,
    title: "Nội dung câu hỏi có vấn đề",
    isChecked: false,
  },
  {
    id: 2,
    title: "Đáp án câu hỏi chưa đúng",
    isChecked: false,
  },
  {
    id: 5,
    title: "Khác",
    isChecked: false,
  },
]

export const typePostConfig = {
  EXAM: 1,
  QUESTION: 2,
  DOCUMENT: 3,
  NEWS: 4
}
