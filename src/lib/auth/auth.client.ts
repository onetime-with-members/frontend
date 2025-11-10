'use client';

import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useContext, useEffect, useState } from 'react';

import { signOutAction } from '../api/actions';
import dayjs from '../dayjs';
import { useUserQuery } from '@/features/user/api/user.query';
import { SessionContext } from '@/features/user/contexts/SessionContext';
import { Session } from '@/features/user/types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { changeSessionTokens } = useContext(SessionContext);

  const router = useRouter();

  const { data: user } = useUserQuery();

  const { mutateAsync: signOutMutation } = useMutation({
    mutationFn: signOutAction,
    onSuccess: async (_, { redirectTo }: { redirectTo?: string }) => {
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.refresh();
      }
      await setCookie('sign-out', true, {
        expires: dayjs().add(1, 'hour').toDate(),
      });
      await deleteCookie('session');
      window.location.reload();
    },
  });

  async function signIn({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) {
    const newSession: Session = { accessToken, refreshToken };
    await changeSessionTokens(newSession);
    setIsLoggedIn(true);
    return newSession;
  }

  async function signOut(params: { redirectTo?: string } = {}) {
    await signOutMutation(params);
  }

  useEffect(() => {
    async function fetchIsLoggedIn() {
      const newIsLoggedIn = (await getCookie('session')) ? true : false;
      setIsLoggedIn(newIsLoggedIn);
    }
    fetchIsLoggedIn();
  }, []);

  return { user, isLoggedIn, signIn, signOut };
}
