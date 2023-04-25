import api from "apis/api";
import queryString from "query-string";

export const bannerAPI = {
  async getBannerByScreen(query) {
    return await api.get(`/banner?${queryString.stringify(query)}`);
  },

  async createBanner(data) {
    return await api.post(`/banner`, { ...data });
  },

  async updateBanner({ dataUpdate, id }) {
    return await api.put(`/banner/${id}`, { ...dataUpdate });
  },

  async deleteBanner(id) {
    return await api.delete(`/banner/${id}`);
  },
};
