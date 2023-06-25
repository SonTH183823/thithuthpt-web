import api from "apis/api";
import queryString from "query-string";

export const QuestionAPI = {
  async raiseQuestion(data) {
    return await api.post("/question", { ...data });
  },
  async getQuestion(query) {
    return await api.get(`/question?${queryString.stringify(query)}`);
  },
  async getQuestionById(id) {
    return await api.get(`/question/${id}`);
  },
  async answerQuestion({ id, answer }) {
    return await api.post(`/question/answer/${id}`, { answer });
  },

  async markFrequent({ id, isFrequent }) {
    return await api.post(`/question/${id}`, { isFrequent });
  },
};
