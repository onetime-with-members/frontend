import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

export default function EventDetailRedirect() {
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('access-token');

  const extendShortenUrl = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_API_URL}/urls/action-original`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
          },
          body: JSON.stringify({
            shorten_url: window.location.href,
          }),
        },
      );

      if (!res.ok) {
        if (res.status === 404) {
          navigate('/not-found', { replace: true });

          throw new Error('Shorten URL not found');
        } else {
          throw new Error('Failed to extend shorten URL');
        }
      }

      return res.json();
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
