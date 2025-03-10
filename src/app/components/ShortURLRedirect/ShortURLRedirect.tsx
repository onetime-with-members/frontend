'use client';

import { AxiosError } from 'axios';
import { useEffect } from 'react';

import axios from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

export default function ShortURLRedirect() {
  const extendShortenUrl = useMutation({
    mutationFn: async () => {
      const res = await axios.post('/urls/action-original', {
        shorten_url: location.href,
      });
      return res.data;
    },
    onSuccess: (data) => {
      location.href = data.payload.original_url;
    },
    onError: (error) => {
      const axiosError = error as AxiosError;
      if (
        axiosError.response?.status === 404 ||
        axiosError.response?.status === 400
      ) {
        notFound();
      }
    },
  });

  useEffect(() => {
    extendShortenUrl.mutate();
  }, [extendShortenUrl]);

  return null;
}
