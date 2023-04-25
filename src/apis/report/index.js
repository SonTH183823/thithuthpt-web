import api from "apis/api";
import queryString from "query-string";

export const reportAPI = {
  async reportPost({ id, data }) {
    return await api.post(`/report/post/${id}`, { ...data });
  },

  async getAllPostReport(query) {
    return await api.get(`/report/post/all?${queryString.stringify(query)}`);
  },

  async getReasonPostReport(id, query) {
    return await api.get(`/report/post/${id}?${queryString.stringify(query)}`);
  },
};
