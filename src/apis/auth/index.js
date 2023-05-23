import api from "apis/api";

export const authAPI = {
  async login(data) {
    return await api.post(`/login`, {...data});
  },
  async refreshToken({refreshToken}) {
    return await api.post(`/refreshToken`, {refreshToken});
  },
  async logout() {
    return await api.post(`/logout`,);
  },

  async loginWithPassword(data) {
    return await api.post(`/loginWithPassword`, {...data});
  },
};
