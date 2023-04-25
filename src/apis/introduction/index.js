import api from "apis/api";

export const IntroductionAPI = {
  async updateIntroduction(data) {
    return await api.put(`/introduction/1`, data );
  },

  async getIntroduction() {
    return await api.get(`/introduction`);
  },
};
