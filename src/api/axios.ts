import _axios, { AxiosError } from 'axios';

const axios = _axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const reissuer = _axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access-token');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      try {
        const res = await reissuer.post('/tokens/action-reissue', {
          refresh_token: localStorage.getItem('refresh-token'),
        });

        localStorage.setItem('access-token', res.data.payload.access_token);
        localStorage.setItem('refresh-token', res.data.payload.refresh_token);
        location.reload();
      } catch (refreshError) {
        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');
        location.reload();
      }
    }

    return Promise.reject(error);
  },
);

export default axios;
