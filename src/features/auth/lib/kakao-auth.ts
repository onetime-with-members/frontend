import { KAKAO_REST_API_CLIENT_SECRET, KAKAO_REST_API_KEY } from '../constants';

export function redirectToKakaoAuth(redirectPathname: string) {
  location.href = `https://kauth.kakao.com/oauth/authorize?${new URLSearchParams(
    {
      client_id: KAKAO_REST_API_KEY,
      redirect_uri: location.origin + redirectPathname,
      response_type: 'code',
      scope: 'talk_calendar',
    },
  ).toString()}`;
}

export async function getKakaoAccessToken(
  code: string,
  redirectPathname: string,
) {
  const res = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: KAKAO_REST_API_KEY,
      redirect_uri: location.origin + redirectPathname,
      code,
      client_secret: KAKAO_REST_API_CLIENT_SECRET,
    }).toString(),
  });

  if (!res.ok) {
    throw new Error('카카오 토큰 요청 도중 오류가 발생했습니다.');
  }

  const data = await res.json();
  const accessToken: string = data.access_token;

  return accessToken;
}
