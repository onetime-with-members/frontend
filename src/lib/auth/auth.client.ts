'use client';

import { setCookie } from 'cookies-next';
import { useContext } from 'react';

import { signOutAction } from '../api/actions';
import dayjs from '../dayjs';
import { useUserQuery } from '@/features/user/api/user.query';
import { SessionContext } from '@/features/user/contexts/SessionContext';
import { Session } from '@/features/user/types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const { isLoggedIn, signInSession, deleteSession } =
    useContext(SessionContext);

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
      await deleteSession();
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
    await signInSession(newSession);
    return newSession;
  }

  async function signOut(params: { redirectTo?: string } = {}) {
    await signOutMutation(params);
  }

  return { user, isLoggedIn, signIn, signOut };
}
