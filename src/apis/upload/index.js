import api from "apis/api";

export const uploadAPI = {
  async uploadImage(data) {
    return await api.post("/uploadImage", {...data});
  },
  async uploadFile(file) {
    const data = new FormData()
    data.append('file', file)
    return await api.post("/upload", data, {
      headers: {
        'Content-Type': "application/x-www-form-urlencoded"
      }
    });
  }
};
