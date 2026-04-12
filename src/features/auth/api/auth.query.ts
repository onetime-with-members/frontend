import { getKakaoAccessToken } from './auth.api';
import { useMutation } from '@tanstack/react-query';

export function useGetKakaoAccessTokenMutation() {
  const { mutateAsync } = useMutation({
    mutationFn: getKakaoAccessToken,
  });

  return {
    getKakaoAccessToken: mutateAsync,
  };
}
