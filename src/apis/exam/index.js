import api from "apis/api";
import queryString from "query-string";

export const ExamAPI = {
  async createExam(data) {
    return await api.post("/exam", {...data});
  },

  async getAllExam(query) {
    return await api.get(`/exam/all?${queryString.stringify(query)}`);
  },

  async getExam(id) {
    return await api.get(`/exam/${id}`);
  },

  async getInfo() {
    return await api.get('totalExam');
  },


  async getExamsByUser(query) {
    return await api.get(`exam/examsByUser?${queryString.stringify(query)}`);
  },

  async sortExam(query) {
    return await api.get(`exam/sortExam?${queryString.stringify(query)}`);
  },

  async filterExam(data) {
    return await api.get(
      `exam?${queryString.stringify({...data})}`
    );
  },
  async filterToeic(data) {
    return await api.get(
      `examToeic?${queryString.stringify({...data})}`
    );
  },


  async toggleFavorite(data) {
    return await api.post(`/favoriteExam`, {...data});
  },

  async getFavoriteExams(query) {
    return await api.get(`/favoriteExam?${queryString.stringify(query)}`);
  },

  async getRelatedExam({id, data}) {
    return await api.get(`exam/related/${id}?${queryString.stringify(data)}`);
  },
  async getListQuestionExam({id}) {
    return await api.get(`exam/question/${id}`);
  },
};
