import api from "apis/api";
import queryString from "query-string";

export const HistoryAPI = {
  async createHistory(data) {
    return await api.post("/history", {...data});
  },

  async getHistoryByUserId(query) {
    return await api.get(`/historyUser?${queryString.stringify(query)}`);
  },
  async getStatisticalHistoryByUserId(query) {
    return await api.get(`/statisticalHistoryUser?${queryString.stringify(query)}`);
  },
  async getBXHByExamId(id) {
    return await api.get(`/BXH/${id}`);
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
