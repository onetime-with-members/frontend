import { InternalAxiosRequestConfig } from 'axios';

import apiClient from './axios';
import { ExtendedAxiosError } from '@/lib/types';
import { retryApiQueue, sessionManager } from '@/models';

let isTokenRefreshing = false;

export async function reissueWhenTokenExpired(
  originalRequest: InternalAxiosRequestConfig,
) {
  if (isTokenRefreshing) {
    return new Promise((resolve) => {
      retryApiQueue.push((accessToken) => {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        resolve(apiClient(originalRequest));
      });
    });
  }

  isTokenRefreshing = true;

  try {
    const { accessToken } = await sessionManager.reissue();
    retryApiQueue.retry((apiRequest) => apiRequest(accessToken));

    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
    isTokenRefreshing = false;

    return apiClient(originalRequest);
  } catch (error) {
    sessionManager.remove();
    retryApiQueue.clear();

    isTokenRefreshing = false;

    console.error(error);

    return Promise.reject(error);
  }
}

export function removeSessionWhenWithdrawal(error: ExtendedAxiosError) {
  sessionManager.remove();

  return Promise.reject(error);
}
