import { SERVER_API_URL } from '@/constants';
import apiClient from '@/lib/api';

export function getKakaoAuthCode() {
  location.href = `${SERVER_API_URL}/kakao/authorize-url`;
}

export async function getKakaoAccessToken(code: string) {
  const res = await apiClient.post('/kakao/token', { code });
  return res.data.payload.access_token;
}
