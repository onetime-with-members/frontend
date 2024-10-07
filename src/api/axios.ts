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
    const refreshToken = localStorage.getItem('refresh-token');

    if (accessToken && refreshToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const originalRequest = { ...error.config };

      const accessToken = localStorage.getItem('access-token');
      const refreshToken = localStorage.getItem('refresh-token');

      if (accessToken && refreshToken) {
        try {
          const res = await reissuer.post(
            '/tokens/action-reissue',
            { refresh_token: refreshToken },
            { headers: { Authorization: `Bearer ${accessToken}` } },
          );

          localStorage.setItem('access-token', res.data.payload.access_token);
          localStorage.setItem('refresh-token', res.data.payload.refresh_token);
          location.reload();

          return axios(originalRequest);
        } catch (error) {
          removeTokens();
        }
      }
    }
  },
);

export default axios;
