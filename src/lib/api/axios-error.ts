import { InternalAxiosRequestConfig } from 'axios';

import apiClient from './axios';
import { retryApiQueue } from './retry-api-queue';
import { EVENT_TOKEN_EXPIRED, EVENT_WITHDRAW } from '@/features/auth/constants';
import { deleteSession, reissueSession } from '@/features/auth/lib/session';
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
    window.dispatchEvent(new CustomEvent(EVENT_TOKEN_EXPIRED));

    return Promise.reject(error);
  }
}

export async function removeSessionWhenWithdrawal(error: ExtendedAxiosError) {
  await deleteSession();
  window.dispatchEvent(new CustomEvent(EVENT_WITHDRAW));

  return Promise.reject(error);
}
