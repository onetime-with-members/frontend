import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

import { Session } from '../types';
import { SERVER_API_URL } from '@/constants';
import dayjs from '@/lib/dayjs';

export async function getSession(): Promise<Session | null> {
  const sessionCookie = await getCookie('session');

  return sessionCookie ? JSON.parse(sessionCookie) : null;
}

export async function setSession(session: Session) {
  await setCookie('session', JSON.stringify(session), {
    expires: dayjs().add(1, 'month').toDate(),
  });
}

export async function reissueSession(): Promise<Session> {
  const session = await getSession();

  if (!session) {
    throw new Error('Not founded session');
  }

  const { accessToken, refreshToken } = session;

  try {
    const res = await axios.post(
      `${SERVER_API_URL}/tokens/action-reissue`,
      { refresh_token: refreshToken },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    const { access_token: newAccessToken, refresh_token: newRefreshToken } =
      res.data.payload;

    const newSession = {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };

    setSession(newSession);

    return newSession;
  } catch (error) {
    throw error;
  }
}

export async function deleteSession() {
  await deleteCookie('session');
}
