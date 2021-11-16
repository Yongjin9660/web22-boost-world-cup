import axios, { AxiosResponse } from 'axios';
import { ImgInfo } from '../../types/Datas';

export const deleteCandidate = (key: string): Promise<AxiosResponse> => axios.delete(`/api/candidates/${key}`);

export const createCandidates = (worldcupId: number, newImgInfos: ImgInfo[]): Promise<AxiosResponse> =>
  axios.post('/api/candidates', { worldcupId, newImgInfos });
