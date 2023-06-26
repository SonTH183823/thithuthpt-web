import api from "apis/api";
import queryString from "query-string";

export const notificationAPI = {
  async getNotifications(query) {
    return api.get(`/notification?${queryString.stringify(query)}`);
  },

  async getTotalNotificationUnViewed() {
    return api.get(`/notification/unViewed`);
  },

  async markRead(id) {
    return api.post(`/notification/markRead/${id}`);
  },

  async markAllViewed() {
    return api.post(`/notification/markAllViewed`);
  },
};
