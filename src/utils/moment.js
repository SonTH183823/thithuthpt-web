import moment from "moment";

export const formatDate = (date) => {
  return moment(date * 1000).format("DD/MM/YYYY");
};
export const formatDateTime = (date) => {
  return moment(date * 1000).format("DD/MM/YYYY HH:mm ");
};
