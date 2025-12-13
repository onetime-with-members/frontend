import { getCookie } from 'cookies-next';

import { REDIRECT_URL } from '@/features/auth/constants';
import useHomeUrl from '@/features/home/hooks/useHomeUrl';
import { useRouter } from '@/i18n/navigation';
import { createUserAction } from '@/lib/api/actions';
import { useAuth } from '@/lib/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useOnboardingMutation({
  setPageIndex,
}: {
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const queryClient = useQueryClient();
  const { signIn } = useAuth();
  const homeUrl = useHomeUrl();
  const redirectUrl = getCookie(REDIRECT_URL);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createUserAction,
    onSuccess: async (data) => {
      await signIn({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      });
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      setPageIndex((prev) => prev + 1);
    },
    onError: (error) => {
      console.error(error);
      router.replace(`/login?redirect_url=${redirectUrl || homeUrl}`);
    },
  });

  return {
    createUser: mutation.mutateAsync,
    ...mutation,
  };
}
