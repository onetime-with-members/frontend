import { InternalAxiosRequestConfig } from 'axios';

import apiClient from './axios';
import { ExtendedAxiosError } from '@/models';
import { retryApiQueue } from '@/services/RetryApiQueue';
import { sessionService } from '@/services/SessionService';

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
    const { accessToken } = await sessionService.reissue();
    retryApiQueue.retry((apiRequest) => apiRequest(accessToken));

    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
    isTokenRefreshing = false;

    return apiClient(originalRequest);
  } catch (error) {
    sessionService.remove();
    retryApiQueue.clear();

    isTokenRefreshing = false;

    console.error(error);

    return Promise.reject(error);
  }
}

export function removeSessionWhenWithdrawal(error: ExtendedAxiosError) {
  sessionService.remove();

  return Promise.reject(error);
}
