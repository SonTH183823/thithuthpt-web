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

  async getHistoryById(id) {
    return await api.get(`history/${id}`);
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

};
