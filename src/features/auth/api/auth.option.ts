import { getKakaoAccessToken } from './auth.api';
import { queryOptions } from '@tanstack/react-query';

export const kakaoAccessTokenQueryOptions = (
  code: string,
  redirectPathname: string,
) =>
  queryOptions({
    queryKey: [
      'kauth.kakao.com',
      'oauth',
      'token',
      { code, redirectPathname },
      '_accessToken',
    ],
    queryFn: async () => await getKakaoAccessToken(code, redirectPathname),
  });
