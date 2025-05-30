'use server';

import dayjs from 'dayjs';

import { SERVER_API_URL } from './constants';
import {
  MyEventType,
  MyScheduleTimeType,
  SleepTimeType,
  UserType,
} from './types';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface Session {
  accessToken: string;
  refreshToken: string;
  expiredAt: number;
}

export async function signIn(
  accessToken: string,
  refreshToken: string,
  redirectUrl?: string,
) {
  const cookieStore = await cookies();

  const accessTokenExpired = dayjs().add(30, 'minutes');
  const refreshTokenExpired = dayjs().add(1, 'month');

  cookieStore.set('access-token', accessToken, {
    expires: accessTokenExpired.toDate(),
  });
  cookieStore.set('refresh-token', refreshToken, {
    expires: refreshTokenExpired.toDate(),
  });

  cookieStore.set(
    'session',
    JSON.stringify({
      accessToken,
      refreshToken,
      expiredAt: accessTokenExpired.valueOf(),
    } satisfies Session),
    {
      expires: refreshTokenExpired.toDate(),
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

async function updateTokens(accessToken: string, refreshToken: string) {
  const newSession = {
    accessToken,
    refreshToken,
    expiredAt: dayjs().add(30, 'minutes').valueOf(),
  };

  const cookieStore = await cookies();
  cookieStore.set('session', JSON.stringify(newSession), {
    expires: dayjs().add(1, 'month').toDate(),
  });

  revalidatePath('/');

  return newSession;
}

export async function auth(): Promise<Session | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  if (!sessionCookie) return null;
  const session = JSON.parse(sessionCookie);

  if (dayjs().isBefore(dayjs(session.expiredAt))) return session;

  const res = await fetch(`${SERVER_API_URL}/tokens/action-reissue`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify({
      refresh_token: session.refreshToken,
    }),
  });
  if (!res.ok) {
    console.error(await res.json());
    await signOut();
    throw new Error('Failed to reissue token');
  }
  const data = await res.json();
  const { access_token: accessToken, refresh_token: refreshToken } =
    data.payload;

  const newSession = await updateTokens(accessToken, refreshToken);

  return newSession;
}

async function accessToken() {
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

export async function fetchMyEvents() {
  const res = await fetch(`${SERVER_API_URL}/events/user/all`, {
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
    },
  });
  if (!res.ok) {
    console.error(await res.json());
    throw new Error('Failed to fetch my events');
  }
  const data = await res.json();
  const events: MyEventType[] = data.payload;

  return events;
}

export async function fetchMySchedules() {
  const res = await fetch(`${SERVER_API_URL}/fixed-schedules`, {
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
    },
  });
  if (!res.ok) {
    console.error(await res.json());
    throw new Error('Failed to fetch my schedule');
  }
  const data = await res.json();
  const mySchedule: MyScheduleTimeType[] = data.payload.schedules;

  return mySchedule;
}

export async function fetchSleepTime() {
  const res = await fetch(`${SERVER_API_URL}/users/sleep-time`, {
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
    },
  });
  if (!res.ok) {
    console.error(await res.json());
    throw new Error('Failed to fetch sleep time');
  }
  const data = await res.json();
  const sleepTime: SleepTimeType = data.payload;

  return sleepTime;
}
