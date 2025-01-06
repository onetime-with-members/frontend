import _axios, { AxiosError } from 'axios';

const accessToken = localStorage.getItem('access-token');

const axios = _axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: accessToken ? `Bearer ${accessToken}` : '',
  },
});

const reissuer = _axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refresh-token');

      try {
        const res = await reissuer.post('/tokens/action-reissue', {
          refresh_token: refreshToken,
        });

        localStorage.setItem('access-token', res.data.payload.access_token);
        localStorage.setItem('refresh-token', res.data.payload.refresh_token);

        axios.defaults.headers.Authorization = `Bearer ${res.data.payload.access_token}`;

        if (originalRequest) {
          return axios(originalRequest);
        }
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
