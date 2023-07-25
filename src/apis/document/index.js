import api from "apis/api";
import queryString from "query-string";

export const DocumentAPI = {
  async createDocument(data) {
    return await api.post("/document", {...data});
  },

  async getAllDocument(query) {
    const f = {
      active: 1,
      ...query
    }
    return await api.get(
      `document?${queryString.stringify({...f})}`
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
    const f = {
      active: 1,
      ...data
    }
    return await api.get(
      `document?${queryString.stringify({...f})}`
    );
  },

  async getPartSubject(data) {
    return await api.get(
      `partSubject?${queryString.stringify({...data})}`
    );
  },

  async getRelatedDocument({id, data}) {
    const f = {
      active: 1,
      ...data
    }
    return await api.get(`document/related/${id}?${queryString.stringify(f)}`);
  },
  async getNewestDocument(data) {
    return await api.get(`newestDocument${queryString.stringify(data)}`);
  },

};
