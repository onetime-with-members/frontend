import { useEffect } from 'react';

import axios from '../api/axios';
import { useMutation } from '@tanstack/react-query';

export default function EventDetailRedirect() {
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
  });

  useEffect(() => {
    extendShortenUrl.mutate();
  }, []);

  return null;
}
