import { useEffect } from 'react';

import { EVENT_TOKEN_EXPIRED, EVENT_WITHDRAW } from '../../constants';
import { useAuth } from '@/lib/auth';

export default function useSignOutWhenTokenEvent() {
  const { clearAuth } = useAuth();

  useEffect(() => {
    async function handleLogout() {
      await clearAuth();
    }

    async function handleWithdraw() {
      await clearAuth();
    }

    window.addEventListener(EVENT_TOKEN_EXPIRED, handleLogout);
    window.addEventListener(EVENT_WITHDRAW, handleWithdraw);

    return () => {
      window.removeEventListener(EVENT_TOKEN_EXPIRED, handleLogout);
      window.removeEventListener(EVENT_WITHDRAW, handleWithdraw);
    };
  }, []);
}
