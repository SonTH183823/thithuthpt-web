import api from "apis/api";
import queryString from "query-string";

export const userAPI = {
  async getProfile() {
    return await api.get(`/details`);
  },

  async getProfileById(id) {
    return await api.get(`/user/${id}`);
  },

  async updateAccount({data}) {
    return await api.put(`/user`, {...data});
  },

  async lockAccount({id, data}) {
    return await api.post(`/user/lock/${id}`, {...data});
  },
};
