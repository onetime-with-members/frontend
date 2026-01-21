import { useEffect } from 'react';

import { EVENT_DELETE_SESSION } from '../../constants';
import { useAuth } from '@/lib/auth';

export default function useSignOutWhenTokenEvent() {
  const { clearAuth } = useAuth();

  useEffect(() => {
    window.addEventListener(EVENT_DELETE_SESSION, clearAuth);

    return () => {
      window.removeEventListener(EVENT_DELETE_SESSION, clearAuth);
    };
  }, []);
}
