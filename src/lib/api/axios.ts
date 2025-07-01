import _axios, { AxiosError } from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import dayjs from 'dayjs';
import pMemoize from 'p-memoize';

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

async function removeTokens() {
  await deleteCookie('session');
  window.location.reload();
}

async function reissueTokens() {
  try {
    const sessionCookie = getCookie('session');
    const { accessToken, refreshToken }: Session = JSON.parse(
      sessionCookie as string,
    );

    const res = await reissuer.post(
      '/tokens/action-reissue',
      {
        refresh_token: refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const { access_token: newAccessToken, refresh_token: newRefreshToken } =
      res.data.payload;

    await setCookie(
      'session',
      JSON.stringify({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      } satisfies Session),
      {
        expires: dayjs().add(1, 'month').toDate(),
      },
    );

    axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

    return newAccessToken;
  } catch (error) {
    console.log('error');
    removeTokens();
    throw error;
  }
}

const memoizedReissueTokens = pMemoize(reissueTokens);

axios.interceptors.request.use(
  async (config) => {
    const sessionCookie = getCookie('session');
    if (!sessionCookie) return config;
    const { accessToken, refreshToken }: Session = JSON.parse(
      sessionCookie as string,
    );

    if (accessToken && refreshToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  async (_error: AxiosError) => {
    const error = _error as ExtendedAxiosError;
    const originalRequest = { ...error.config };

    if (error.response?.data.code === 'TOKEN-003' && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await memoizedReissueTokens();
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return axios(originalRequest);
      } catch (reissueError) {
        return Promise.reject(reissueError);
      }
    } else if (error.response && error.response.data.code === 'USER-003') {
      removeTokens();
    }

    return Promise.reject(error);
  },
);

export default axios;
