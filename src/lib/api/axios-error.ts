import { InternalAxiosRequestConfig } from 'axios';

import apiClient from './axios';
import { deleteSession, reissueSession } from '@/features/user/lib/session';
import { retryApiQueue } from '@/services/RetryApiQueue';
import { ExtendedAxiosError } from '@/types';

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
    const session = await reissueSession();

    retryApiQueue.retry((apiRequest) => apiRequest(session.accessToken));

    originalRequest.headers.Authorization = `Bearer ${session.accessToken}`;
    isTokenRefreshing = false;

    return apiClient(originalRequest);
  } catch (error) {
    await deleteSession();
    retryApiQueue.clear();

    isTokenRefreshing = false;

    console.error(error);

    return Promise.reject(error);
  }
}

export async function removeSessionWhenWithdrawal(error: ExtendedAxiosError) {
  await deleteSession();

  return Promise.reject(error);
}
