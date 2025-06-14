'use server';

import dayjs from 'dayjs';

import { SERVER_API_URL, defaultUser } from './constants';
import { OnboardingValueType, UserType } from './types';
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
    return defaultUser;
  }
  const data = await res.json();
  const user: UserType = data.payload;

  return user;
}

export async function createUser(formData: FormData) {
  const onboardingValue: OnboardingValueType = JSON.parse(
    formData.get('onboardingValue') as string,
  );

  const cookieStore = await cookies();

  const redirectUrl = cookieStore.get('redirect-url');

  const res = await fetch(`${SERVER_API_URL}/users/onboarding`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await accessToken()}`,
    },
    body: JSON.stringify(onboardingValue),
  });
  if (!res.ok) {
    console.error(await res.json());
    redirect(`/login?redirect_url=${redirectUrl || '/'}`);
  }
  const data = await res.json();
  const { access_token: newAccessToken, refresh_token: newRefreshToken } =
    data.payload;

  cookieStore.set(
    'session',
    JSON.stringify({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    } satisfies Session),
    {
      expires: dayjs().add(1, 'month').toDate(),
    },
  );
}

export async function withdraw() {
  const res = await fetch(`${SERVER_API_URL}/users/action-withdraw`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
    },
  });
  if (!res.ok) {
    console.error(await res.json());
    throw new Error('Failed to withdraw account');
  }
  const cookieStore = await cookies();
  cookieStore.delete('session');

  revalidatePath('/');

  redirect('/');
}
