import api from "apis/api";
import queryString from "query-string";

export const DocumentAPI = {
  async createDocument(data) {
    return await api.post("/document", {...data});
  },

  async getAllDocument(query) {
    return await api.get(
      `document?${queryString.stringify({...query})}`
    );
  },

  async getDocument(id) {
    return await api.get(`/document/${id}`);
  },
  async countTestView(id) {
    return await api.put(`/countViewDocument/${id}`);
  },

  async getDocumentsByUser(query) {
    return await api.get(`document/documentsByUser?${queryString.stringify(query)}`);
  },

  async sortDocument(query) {
    return await api.get(`document/sortDocument?${queryString.stringify(query)}`);
  },

  async filterDocument(data) {
    return await api.get(
      `document?${queryString.stringify({...data})}`
    );
  },
  async filterToeic(data) {
    return await api.get(
      `documentToeic?${queryString.stringify({...data})}`
    );
  },

  async getPartSubject(data) {
    return await api.get(
      `partSubject?${queryString.stringify({...data})}`
    );
  },

  async getRelatedDocument({id, data}) {
    return await api.get(`document/related/${id}?${queryString.stringify(data)}`);
  },
  async getNewestDocument(data) {
    return await api.get(`newestDocument${queryString.stringify(data)}`);
  },

};
