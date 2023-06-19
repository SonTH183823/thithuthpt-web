import slugify from "slugify";
import {formatDate} from "./moment";
import {domainUpload, levelConfig, subjectArrConfig} from "../configs/configs";
import moment from "moment";

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

export function checkPoint(awards, point) {
  for (let i = 0; i < awards.length; i++) {
    if (point < awards[i].minimumLevel) {
      return i
    }
  }
  return awards.length - 1
}

export const genURLImage = (image) => {
  if (image) {
    if (image.includes('blob:')) {
      return image
    } else {
      if (image.includes('http')) {
        return image
      } else {
        return `${domainUpload}/${image}`
      }
    }
  }
  return ''
}

export const genTagExam = (item) => {
  const date = new Date()
  let data = {}
  if (item?.outstanding) {
    data = {
      label: 'Nổi bật',
      value: 4
    }
    return data
  } else if (date.getTime() - (item?.createdAt * 1000) <= 259200000) {
    data = {
      label: 'Mới nhất',
      value: 2
    }
    return data
  } else {
    data = {
      label: subjectArrConfig[(item?.subject - 1) || 0].label + "  - " + levelConfig[(item?.level - 1) || 0].label,
      value: item?.level || 1
    }
    return data
  }
}

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
  return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
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

