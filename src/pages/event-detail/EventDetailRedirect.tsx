import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from '../../utils/axios';
import { useMutation } from '@tanstack/react-query';

export default function EventDetailRedirect() {
  const navigate = useNavigate();

  const extendShortenUrl = useMutation({
    mutationFn: async () => {
      const res = await axios.post('/urls/action-original', {
        shorten_url: window.location.href,
      });
      return res.data;
    },
    onSuccess: (data) => {
      window.location.href = data.payload.original_url;
    },
    onError: (error) => {
      const axiosError = error as AxiosError;
      if (
        axiosError.response?.status === 404 ||
        axiosError.response?.status === 400
      ) {
        navigate('/not-found');
      }
    },
  });

  useEffect(() => {
    extendShortenUrl.mutate();
  }, []);

  return null;
}
