import _axios, { AxiosError } from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import dayjs from 'dayjs';

import { ExtendedAxiosError, Session } from './types';

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

    if (error.response && error.response.data.code === 'TOKEN-003') {
      const sessionCookie = getCookie('session');
      if (!sessionCookie) removeTokens();

      const { accessToken, refreshToken }: Session = JSON.parse(
        sessionCookie as string,
      );

      if (accessToken && refreshToken) {
        try {
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
          const newTokens = res.data.payload;

          await setCookie(
            'session',
            JSON.stringify({
              accessToken: newTokens.access_token,
              refreshToken: newTokens.refresh_token,
            } satisfies Session),
            {
              expires: dayjs().add(1, 'month').toDate(),
            },
          );

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newTokens.access_token}`;
          }

          return axios(originalRequest);
        } catch (error) {
          console.error(error);
          const axiosError = error as ExtendedAxiosError;
          const errorCode = axiosError.response.data.code;
          if (errorCode !== 'TOKEN-009') {
            removeTokens();
          }
        }
      } else {
        removeTokens();
      }
    } else if (error.response && error.response.data.code === 'USER-003') {
      removeTokens();
    }

    return Promise.reject(error);
  },
);

export default axios;
