'use client';

import { setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

import { signOutAction } from '../api/actions';
import dayjs from '../dayjs';
import { useUserQuery } from '@/features/user/api/user.query';
import { sessionService } from '@/services/SessionService';
import { Session } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const queryClient = useQueryClient();
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
      await sessionService.remove();
      setTimeout(() => {
        queryClient.removeQueries({ queryKey: ['users'] });
      }, 500);
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
    await sessionService.set(newSession);
    return newSession;
  }

  async function signOut(params: { redirectTo?: string } = {}) {
    await signOutMutation(params);
  }

  useEffect(() => {
    async function fetchIsLoggedIn() {
      setIsLoggedIn(sessionService.isLoggedIn);
    }
    fetchIsLoggedIn();
  }, []);

  return { user, isLoggedIn, signIn, signOut };
}
