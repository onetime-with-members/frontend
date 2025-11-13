import { useEffect } from 'react';

import { deleteSignOutCookie } from '../../lib/sign-out-cookie';

export default function useSignOutCookieClear() {
  useEffect(() => {
    async function signOutCookieClear() {
      await deleteSignOutCookie();
    }
    signOutCookieClear();
  }, []);
}
