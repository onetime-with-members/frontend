'use server';

import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';

import { SERVER_API_URL } from './constants';
import { UserType } from './types';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export interface Session {
  accessToken: string;
  refreshToken: string;
}

export async function signIn(
  accessToken: string,
  refreshToken: string,
  redirectUrl?: string,
) {
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

  if (redirectUrl) redirect(redirectUrl);
}

export async function signOut(redirectUrl?: string) {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  cookieStore.delete('access-token');
  cookieStore.delete('refresh-token');

  revalidatePath('/');

  if (redirectUrl) redirect(redirectUrl);
}

export async function auth(): Promise<Session | null> {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get('session')?.value;
  if (!sessionCookie) return null;
  const session = JSON.parse(sessionCookie);

  return session;
}

export async function accessToken() {
  const session = await auth();
  if (!session) throw new Error('Unauthorized Error');
  return session.accessToken;
}

export async function currentUser() {
  const res = await fetch(`${SERVER_API_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
    },
    cache: 'force-cache',
  });
  if (!res.ok) {
    console.error(await res.json());
    throw new Error('Failed to fetch current user');
  }
  const data = await res.json();
  const user: UserType = data.payload;

  return user;
}
