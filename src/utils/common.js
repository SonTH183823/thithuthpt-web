import slugify from "slugify";
import { formatDate } from "./moment";

export const checkPhone = (phone) => {
  return /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(phone);
};

export const checkEmail = (email) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

export const formatPrice = (price) => {
  if (price >= 0) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
};

export const strToSlug = (str) => {
  return slugify(str, "-");
};

export const generateSpecificAdress = (
  houseNumber,
  lane,
  street,
  ward,
  district,
  province
) => {
  return `${houseNumber ? houseNumber + ", " : ""}${lane ? lane + ", " : ""}${
    street ? street + ", " : ""
  }${ward}, ${district}, ${province}.`;
};

export const generateDate = (date) => {
  const dateFormatArray = formatDate(date).split("/");
  if (dateFormatArray[1].charAt(0) === "0") {
    return `tháng ${dateFormatArray[1].charAt(1)} năm ${dateFormatArray[2]}`;
  }
  return `tháng ${dateFormatArray[1]} năm ${dateFormatArray[2]}`;
};

export const formatPhoneNumerDisplay = (phoneNumber) => {
  let phoneNumberDisplay = "";
  for (let i = 0; i < phoneNumber.length; i++) {
    if (i > 2 && i <= 7) {
      phoneNumberDisplay += "*";
    } else {
      phoneNumberDisplay += phoneNumber[i];
    }
  }
  return phoneNumberDisplay;
};

export function kFormatter(num) {
  return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

export const formatNumberView = (viewCount) => {
  if (viewCount / 1000 >= 1 && viewCount / 1000 < 1000) {
    let num = viewCount / 1000
    num = num.toFixed(2)
    return `${num}K`
  } else if (viewCount / 1000000 >= 1) {
    let num = viewCount / 1000000
    num = num.toFixed(2)
    return `${num}M`
  } else {
    return viewCount
  }
}

