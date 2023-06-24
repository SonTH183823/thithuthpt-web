import api from "apis/api";
import queryString from "query-string";

export const HistoryAPI = {
  async createHistory(data) {
    return await api.post("/history", {...data});
  },

  async getAllHistoryByUserId(query) {
    return await api.get(`/historyUser?${queryString.stringify(query)}`);
  },

  async finishExam(data) {
    return await api.post(`/finishExam`, data);
  },

  async getHistorysByUser(query) {
    return await api.get(`history/historysByUser?${queryString.stringify(query)}`);
  },

  async sortHistory(query) {
    return await api.get(`history/sortHistory?${queryString.stringify(query)}`);
  },

  async filterHistory(data) {
    return await api.post(
      `history/filterHistory?${queryString.stringify({...data})}`
    );
  },

  async approveHistory(historyId, data) {
    return await api.post(`history/approveHistory/${historyId}}`, {...data});
  },

  async toggleFavorite(data) {
    return await api.post(`favorite`, {...data});
  },

  async getFavoriteHistorys() {
    return await api.get(`favorite`);
  },


  async getRelatedHistory({id, data}) {
    return await api.get(`history/related/${id}?${queryString.stringify(data)}`);
  },
};
