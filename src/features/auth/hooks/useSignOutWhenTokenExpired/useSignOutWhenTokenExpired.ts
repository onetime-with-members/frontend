import { useEffect } from 'react';

import { EVENT_TOKEN_EXPIRED } from '../../constants';
import { useAuth } from '@/lib/auth';

export default function useSignOutWhenTokenExpired() {
  const { tokenExpired } = useAuth();

  useEffect(() => {
    async function handleLogout() {
      await tokenExpired();
    }

    window.addEventListener(EVENT_TOKEN_EXPIRED, handleLogout);

    return () => {
      window.removeEventListener(EVENT_TOKEN_EXPIRED, handleLogout);
    };
  }, []);
}
