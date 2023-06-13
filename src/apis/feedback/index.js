import api from "apis/api";
import queryString from "query-string";

export const feedbackAPI = {
  async createFeedback(data) {
    return await api.post(`/rate`, { ...data });
  },

  async getFeedbacks(query) {
    return await api.get(`/rate?${queryString.stringify(query)}`);
  },
};
