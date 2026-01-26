import { InternalAxiosRequestConfig } from 'axios';

import apiClient from './axios';
import { retryApiQueue } from './retry-api-queue';
import { EVENT_DELETE_SESSION } from '@/features/auth/constants';
import { deleteSession, reissueSession } from '@/features/auth/lib/session';

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

    retryApiQueue.retry(session.accessToken);

    originalRequest.headers.Authorization = `Bearer ${session.accessToken}`;
    isTokenRefreshing = false;

    return apiClient(originalRequest);
  } catch (error: unknown) {
    retryApiQueue.clear();
    isTokenRefreshing = false;
    return deleteSessionWhenAuthError(error);
  }
}

export async function deleteSessionWhenAuthError(error: unknown) {
  await deleteSession();
  window.dispatchEvent(new CustomEvent(EVENT_DELETE_SESSION));

  return Promise.reject(error);
}
