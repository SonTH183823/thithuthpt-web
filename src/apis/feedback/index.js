import api from "apis/api";
import queryString from "query-string";

export const feedbackAPI = {
  async createFeedback(data) {
    return await api.post(`/feedback`, { ...data });
  },

  async getFeedbacks(query) {
    return await api.get(`/feedback?${queryString.stringify(query)}`);
  },

  async markOutstanding({ id, status }) {
    return await api.post(`/feedback/${id}`, { status });
  },
};
