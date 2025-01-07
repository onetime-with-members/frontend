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

function removeTokens() {
  localStorage.removeItem('access-token');
  localStorage.removeItem('refresh-token');
  location.reload();
}

axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access-token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refresh-token');
      if (refreshToken) {
        try {
          const res = await reissuer.post('/tokens/action-reissue', {
            refresh_token: refreshToken,
          });

          localStorage.setItem('access-token', res.data.payload.access_token);
          localStorage.setItem('refresh-token', res.data.payload.refresh_token);
          location.reload();
        } catch (refreshError) {
          removeTokens();
        }
      } else {
        removeTokens();
      }
    }
    return Promise.reject(error);
  },
);

export default axios;
