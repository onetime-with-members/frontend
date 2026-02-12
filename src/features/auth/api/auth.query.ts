import { kakaoAccessTokenQueryOptions } from './auth.option';
import { useQuery } from '@tanstack/react-query';

export function useKakaoAccessTokenQuery(
  code: string,
  redirectPathname: string,
  { enabled }: { enabled: boolean } = { enabled: true },
) {
  const { data } = useQuery({
    ...kakaoAccessTokenQueryOptions(code, redirectPathname),
    enabled,
  });

  return { data };
}
