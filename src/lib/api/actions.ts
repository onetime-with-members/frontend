import { getCookie } from 'cookies-next';

import apiClient from './axios';
import { Session } from '@/features/auth/types';

export async function signOutAction() {
  const { refreshToken }: Session = JSON.parse(
    (await getCookie('session')) as string,
  );
  const res = await apiClient.post('/users/logout', {
    refresh_token: refreshToken,
  });
  return res.data.payload;
}
