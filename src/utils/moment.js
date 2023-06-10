import moment from "moment";

export const formatDate = (date) => {
  return moment(date * 1000).utc().format("DD/MM/YYYY");
};
