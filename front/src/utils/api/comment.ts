import axios from 'axios';
import { CommentData } from '../../types/Datas';

export const getComments = async (worldcupId: string, offset: number, limit: number): Promise<CommentData[]> => {
  const response = await axios.get(`/api/comments/${worldcupId}`, { params: { offset, limit } });
  const {
    data: { comments },
  } = response;
  return comments;
};

export const createComment = async (worldcupId: string, message: string): Promise<CommentData> => {
  const response = await axios.post('/api/comments', {
    worldcupId,
    message,
  });
  return response.data;
};

interface commonResponse {
  result: 'success' | 'fail';
}

export const deleteComment = async (commentId: string): Promise<commonResponse> => {
  const response = await axios.delete(`/api/comments/${commentId}`);
  return response.data;
};

interface lengthResponse {
  commentCount: number;
}

export const getCommentsCount = async (worldcupId: string): Promise<lengthResponse> => {
  const response = await axios.get(`/api/comments/count/${worldcupId}`);
  return response.data;
};
