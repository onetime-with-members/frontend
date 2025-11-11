'use client';

import { useContext } from 'react';

import { addSignOutCookie } from './sign-out-cookie';
import { SessionContext } from '@/features/auth/contexts/SessionContext';
import { Session } from '@/features/auth/types';
import { useUserQuery } from '@/features/user/api/user.query';
import { signOutAction } from '@/lib/api/actions';
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
  });

  async function signIn(session: Session) {
    await signInSession(session);
  }

  async function signOut({ redirectTo }: { redirectTo?: string } = {}) {
    await signOutMutation();

    await deleteSession();
    await addSignOutCookie();
    queryClient.removeQueries({ queryKey: ['users'] });

    router.refresh();
    if (redirectTo) {
      router.push(redirectTo);
    }
  }

  return { user, isLoggedIn, signIn, signOut };
}
