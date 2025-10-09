import { deleteCookie, getCookie, setCookie } from 'cookies-next';

import { signOutAction } from '../api/actions';
import { userQueryOptions } from '../api/query-options';
import dayjs from '../dayjs';
import { Session } from '@/models';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const sessionCookie = getCookie('session');

  const { data: user } = useQuery({
    ...userQueryOptions,
  });

  const { mutateAsync: signOutMutation } = useMutation({
    mutationFn: signOutAction,
    onSuccess: async (_, { redirectTo }: { redirectTo?: string }) => {
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.refresh();
      }
      await deleteCookie('session');
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
    const newSession: Session = {
      accessToken,
      refreshToken,
    };
    await setCookie('session', JSON.stringify(newSession), {
      expires: dayjs().add(1, 'month').toDate(),
    });
    return newSession;
  }

  async function signOut(params: { redirectTo?: string } = {}) {
    await signOutMutation(params);
  }

  return { user, isLoggedIn: !!sessionCookie, signIn, signOut };
}
