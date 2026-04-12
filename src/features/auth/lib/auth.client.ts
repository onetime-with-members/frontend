'use client';

import { useContext } from 'react';

import { addSignOutSession } from './sign-out-session';
import { SessionContext } from '@/features/auth/contexts/SessionContext';
import { Session } from '@/features/auth/types';
import { useUserQuery } from '@/features/user/api/user.query';
import { usePathname, useRouter } from '@/i18n/navigation';
import { signOutAction } from '@/lib/api/actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
    await clearAuth();
    if (redirectTo) {
      router.push(redirectTo);
    } else if (pathname === '/dashboard') {
      router.push('/landing');
    }
  }

  async function clearAuth() {
    await deleteSession();
    await addSignOutSession();
    queryClient.clear();

    router.refresh();
  }

  return {
    user,
    isLoggedIn,
    signIn,
    signOut,
    clearAuth,
  };
}
