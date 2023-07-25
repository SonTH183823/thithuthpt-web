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
  async countTestView(id, data) {
    return await api.put(`/countTestView/${id}`, data);
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
    const filter = {
      active: 1,
      ...data
    }
    return await api.get(
      `exam?${queryString.stringify({...filter})}`
    );
  },
  async filterToeic(data) {
    const filter = {
      active: 1,
      ...data
    }
    return await api.get(
      `examToeic?${queryString.stringify({...filter})}`
    );
  },


  async toggleFavorite(data) {
    return await api.post(`/favoriteExam`, {...data});
  },

  async getFavoriteExams(query) {
    const filter = {
      active: 1,
      ...query
    }
    return await api.get(`/favoriteExam?${queryString.stringify(filter)}`);
  },

  async getRelatedExam({id, data}) {
    const filter = {
      active: 1,
      ...data
    }
    return await api.get(`exam/related/${id}?${queryString.stringify(filter)}`);
  },
  async getListQuestionExam({id}) {
    return await api.get(`exam/question/${id}`);
  },
};
