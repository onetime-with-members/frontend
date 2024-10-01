import _axios from 'axios';

const axios = _axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access-token');
    const refreshToken = localStorage.getItem('refresh-token');

    config.headers.Authorization = config.headers.Authorization
      ? config.headers.Authorization
      : accessToken && refreshToken
        ? `Bearer ${accessToken}`
        : '';

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axios;
