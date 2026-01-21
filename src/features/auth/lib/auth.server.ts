'use server';

import { Session } from '@/features/auth/types';
import { cookies } from 'next/headers';

export async function auth() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    const session: Session | null = sessionCookie
      ? JSON.parse(sessionCookie.value)
      : null;

    return { isLoggedIn: !!sessionCookie, session, isInvalidSession: false };
  } catch {
    return { isLoggedIn: false, session: null, isInvalidSession: true };
  }
}
