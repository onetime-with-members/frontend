'use server';

import dayjs from 'dayjs';

import { SERVER_API_URL } from './constants';
import { UserType } from './types';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signIn(
  accessToken: string,
  refreshToken: string,
  redirectUrl?: string,
) {
  const cookieStore = await cookies();

  const accessTokenExpired = dayjs().add(1, 'hour');
  const refreshTokenExpired = dayjs().add(1, 'month');

  cookieStore.set('access-token', accessToken, {
    expires: accessTokenExpired.toDate(),
  });
  cookieStore.set('refresh-token', refreshToken, {
    expires: refreshTokenExpired.toDate(),
  });
  cookieStore.set('expired-at', `${accessTokenExpired.valueOf()}`, {
    expires: refreshTokenExpired.toDate(),
  });

  if (redirectUrl) redirect(redirectUrl);
}

export async function signOut(redirectUrl?: string) {
  const cookieStore = await cookies();

  cookieStore.delete('access-token');
  cookieStore.delete('refresh-token');
  cookieStore.delete('expired-at');

  revalidatePath('/');

  if (redirectUrl) redirect(redirectUrl);
}

export async function auth() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('access-token')?.value;
  const refreshToken = cookieStore.get('refresh-token')?.value;
  const expiredAt = cookieStore.get('expired-at')?.value;

  if (!accessToken || !refreshToken || !expiredAt) return null;

  if (dayjs().isBefore(dayjs(Number(expiredAt)))) return accessToken;

  const res = await fetch(`${SERVER_API_URL}/token/action-reissue`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      refresh_token: refreshToken,
    }),
  });
  if (!res.ok) {
    await signOut();
    return null;
  }
  const data = await res.json();

  await signIn(data.payload.access_token, data.payload.refresh_token);

  return data.payload.access_token;
}

export async function currentUser() {
  const accessToken = await auth();

  const res = await fetch(`${SERVER_API_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    console.log(await res.json());
    throw new Error('Failed to fetch current user');
  }

  const data = await res.json();
  const user: UserType = data.payload;

  return user;
}
