'use client';

import { setCookie } from 'cookies-next';
import { useContext } from 'react';

import { signOutAction } from '../api/actions';
import dayjs from '../dayjs';
import { useUserQuery } from '@/features/user/api/user.query';
import { SessionContext } from '@/features/user/contexts/SessionContext';
import { Session } from '@/features/user/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const { isLoggedIn, signInSession, deleteSession } =
    useContext(SessionContext);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user } = useUserQuery();

  const { mutateAsync: signOutMutation } = useMutation({
    mutationFn: signOutAction,
    onSuccess: async (_, { redirectTo }: { redirectTo?: string }) => {
      await setCookie('sign-out', true, {
        expires: dayjs().add(1, 'hour').toDate(),
      });
      await deleteSession();
      queryClient.removeQueries({ queryKey: ['users'] });
      router.refresh();
      if (redirectTo) {
        router.push(redirectTo);
      }
    },
  });

  async function signIn(session: Session) {
    await signInSession(session);
  }

  async function signOut(params: { redirectTo?: string } = {}) {
    await signOutMutation(params);
  }

  return { user, isLoggedIn, signIn, signOut };
}
