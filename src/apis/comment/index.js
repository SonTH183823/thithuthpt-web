import api from "apis/api";
import queryString from "query-string";

export const commentAPI = {
  async postComment(data) {
    return await api.post("/comment", {...data});
  },

  async getComments({postId, page, perPage}) {
    const query = {page, perPage};
    return await api.get(`/comment/${postId}?${queryString.stringify(query)}`);
  },
  async updateComment(data, id) {
    return await api.put(`/comment/${id}`, data)
  },
  async updateReactComment(data, id) {
    return await api.put(`/reactComment/${id}`, data)
  },

  async getReplyComment({commentId, offset, limit}) {
    const query = {offset, limit};
    return await api.get(
      `/comment/reply/${commentId}?${queryString.stringify(query)}`
    );
  },

  async postCommentReply({
                           parentId,
                           userId,
                           content,
                           videoBase64,
                           imageBase64,
                           owner,
                           postId,
                         }) {
    const data = {parentId, userId, owner, postId};
    if (content) {
      data.content = content;
    }
    if (imageBase64) {
      data.imageBase64 = imageBase64;
    }
    if (videoBase64) {
      data.videoBase64 = videoBase64;
    }

    return await api.post(`/comment/reply`, {...data});
  },

  async deleteComment(commentId) {
    return await api.delete(`/comment/${commentId}`);
  },

  // status comment user
  async getStatusComments({commentId, userId}) {
    const query = {commentId, userId};
    return await api.get(`/commentStatus?${queryString.stringify(query)}`);
  },

  async createStatusComment(data) {
    return await api.post(`/commentStatus`, data);
  },

  async updateStatusComment(data, id) {
    return await api.put(`/commentStatus/${id}`, data);
  },

  async deleteStatusComment(id) {
    return await api.delete(`/commentStatus/${id}`);
  },
  async deleteStatusCommentNotId(data) {
    return await api.post(`/delCommentStatus?${queryString.stringify(data)}`);
  },
};
