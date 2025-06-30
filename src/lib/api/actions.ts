'use server';

import { SERVER_API_URL, defaultUser } from '../constants';
import dayjs from '../dayjs';
import { Session } from '../types';
import auth from './auth.server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function signIn(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();
  cookieStore.set(
    'session',
    JSON.stringify({
      accessToken,
      refreshToken,
    } satisfies Session),
    {
      expires: dayjs().add(1, 'month').toDate(),
    },
  );

  revalidatePath('/');
}

export async function signOut() {
  const { data: session } = await auth();

  const res = await fetch(`${SERVER_API_URL}/users/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refresh_token: session?.refreshToken,
    }),
  });
  if (!res.ok) {
    console.error(await res.json());
    return defaultUser;
  }

  const cookieStore = await cookies();
  cookieStore.delete('session');

  revalidatePath('/');
}

export async function accessToken() {
  const { data: session } = await auth();
  if (!session) throw new Error('Unauthorized Error');
  return session.accessToken;
}
