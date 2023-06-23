import api from "apis/api";

export const RatingAPI = {
  async createRatePost(data) {
    return await api.post(`/ratePost`, {...data});
  },
  async updateRatePost(data, id) {
    return await api.put(`/ratePost/${id}`, {...data});
  },

  async getRatePostByUserId(id) {
    return await api.get(`/ratePost/${id}`);
  },
};
