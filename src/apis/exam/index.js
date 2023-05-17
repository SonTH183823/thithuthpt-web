import api from "apis/api";
import queryString from "query-string";
export const ExamAPI = {
  async createExam(data) {
    return await api.post("/exam", { ...data });
  },

  async getAllExam(query) {
    return await api.get(`/exam/all?${queryString.stringify(query)}`);
  },

  async getExam(id) {
    return await api.get(`/exam/${id}`);
  },

  async getExamsByUser(query) {
    return await api.get(`exam/examsByUser?${queryString.stringify(query)}`);
  },

  async sortExam(query) {
    return await api.get(`exam/sortExam?${queryString.stringify(query)}`);
  },

  async filterExam(data) {
    return await api.post(
      `exam/filterExam?${queryString.stringify({ ...data })}`
    );
  },

  async approveExam(postId, data) {
    return await api.post(`exam/approveExam/${postId}}`, { ...data });
  },

  async toggleFavorite(data) {
    return await api.post(`favorite`, { ...data });
  },

  async getFavoriteExams() {
    return await api.get(`favorite`);
  },


  async getRelatedExam({ id, data }) {
    return await api.get(`exam/related/${id}?${queryString.stringify(data)}`);
  },
};
