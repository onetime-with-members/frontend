import _axios, { AxiosError, AxiosRequestConfig } from 'axios';

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
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refresh-token');
      if (refreshToken) {
        try {
          const { data } = await reissuer.post('/tokens/action-reissue', {
            refresh_token: refreshToken,
          });

          localStorage.setItem('access-token', data.payload.access_token);
          localStorage.setItem('refresh-token', data.payload.refresh_token);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${data.payload.access_token}`;
          }

          return axios(originalRequest);
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
