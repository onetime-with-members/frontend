export interface Session {
  accessToken: string;
  refreshToken: string;
}

export type SocialLoginType = 'naver' | 'kakao' | 'google';
