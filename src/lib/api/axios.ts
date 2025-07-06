import _axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import dayjs from 'dayjs';

import { ExtendedAxiosError, Session } from '../types';

const axios = _axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const reissuer = _axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

function removeTokensAndReload() {
  deleteCookie('session');
  window.location.reload();
}

let isReissuingToken = false;
let tokenReissuePromise: Promise<string> | null = null;

axios.interceptors.request.use(
  (config) => {
    const sessionCookie = getCookie('session');
    if (sessionCookie) {
      const { accessToken }: Session = JSON.parse(sessionCookie as string);
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  async (_error: AxiosError) => {
    const error = _error as ExtendedAxiosError;
    const originalRequest = error.config as InternalAxiosRequestConfig;

    if (error.response?.data.code === 'TOKEN-003') {
      if (isReissuingToken && tokenReissuePromise) {
        try {
          const newAccessToken = await tokenReissuePromise;
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }
          return axios(originalRequest);
        } catch (e) {
          return Promise.reject(e);
        }
      }

      isReissuingToken = true;

      tokenReissuePromise = new Promise(async (resolve, reject) => {
        const sessionCookie = getCookie('session');
        if (!sessionCookie) {
          removeTokensAndReload();
          return reject(new Error('No session cookie found.'));
        }

        const { accessToken, refreshToken }: Session = JSON.parse(
          sessionCookie as string,
        );

        if (!refreshToken) {
          removeTokensAndReload();
          return reject(new Error('No refresh token found.'));
        }

        try {
          const res = await reissuer.post(
            '/tokens/action-reissue',
            { refresh_token: refreshToken },
            { headers: { Authorization: `Bearer ${accessToken}` } },
          );

          const newTokens = res.data.payload;
          const newAccessToken = newTokens.access_token;
          const newRefreshToken = newTokens.refresh_token;

          await setCookie(
            'session',
            JSON.stringify({
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            } satisfies Session),
            { expires: dayjs().add(1, 'month').toDate() },
          );

          axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

          resolve(newAccessToken);
        } catch (reissueError) {
          removeTokensAndReload();

          reject(reissueError);
        } finally {
          isReissuingToken = false;
          tokenReissuePromise = null;
        }
      });

      try {
        const newAccessToken = await tokenReissuePromise;
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return axios(originalRequest);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    if (error.response?.data.code === 'USER-003') {
      removeTokensAndReload();
    }

    return Promise.reject(error);
  },
);

export default axios;
