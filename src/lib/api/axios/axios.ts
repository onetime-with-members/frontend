import axios from 'axios';

import {
  reissueWhenTokenExpired,
  removeSessionWhenWithdrawal,
} from './axios-error';
import { SERVER_API_URL } from '@/lib/constants';
import { ExtendedAxiosError } from '@/lib/types';
import { sessionManager } from '@/models';

const apiClient = axios.create({
  baseURL: SERVER_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const { accessToken } = await sessionManager.get();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: ExtendedAxiosError) => {
    const {
      config: originalRequest,
      response: {
        data: { code: errorCode },
      },
    } = error;

    if (errorCode === 'TOKEN-003') {
      return await reissueWhenTokenExpired(originalRequest);
    }

    if (errorCode === 'USER-003') {
      return removeSessionWhenWithdrawal(error);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
