'use client';

import { deleteCookie } from 'cookies-next';
import { useEffect } from 'react';

import usePolicyEditRedirect from '@/features/set-up/hooks/usePolicyEditRedirect';
import useUserSetUp from '@/features/set-up/hooks/useUserSetUp';

export default function SetUpProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useUserSetUp();
  usePolicyEditRedirect();

  useEffect(() => {
    async function deleteIsSignedOutCookie() {
      await deleteCookie('sign-out');
    }
    deleteIsSignedOutCookie();
  }, []);

  return children;
}
