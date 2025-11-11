'use client';

import { useContext } from 'react';

import { signOutAction } from '../api/actions';
import { useUserQuery } from '@/features/user/api/user.query';
import { SessionContext } from '@/features/user/contexts/SessionContext';
import { Session } from '@/features/user/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';

export function useAuth() {
  const { isLoggedIn, signInSession, deleteSession } =
    useContext(SessionContext);

  const router = useRouter();
  const pathname = usePathname();
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
    queryClient.removeQueries({ queryKey: ['users'] });

    router.refresh();
    if (redirectTo) {
      router.push(redirectTo);
    } else if (pathname === '/dashboard') router.push('/');
  }

  return { user, isLoggedIn, signIn, signOut };
}
