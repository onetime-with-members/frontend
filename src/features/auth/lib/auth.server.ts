'use server';

import { Session } from '@/features/auth/types';
import { cookies } from 'next/headers';

export async function auth() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');

  const session: Session | null = sessionCookie
    ? JSON.parse(sessionCookie.value)
    : null;

  return { isLoggedIn: !!sessionCookie, session };
}
