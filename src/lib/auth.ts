import { getCookie } from 'cookies-next';

import { Session } from './auth-action';
import { cookies } from 'next/headers';

interface AuthResponse {
  data: Session | null;
  isLoggedIn: boolean;
}

export async function auth(): Promise<AuthResponse> {
  'use server';
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');
  if (!sessionCookie) return { data: null, isLoggedIn: false };
  return { data: JSON.parse(sessionCookie.value as string), isLoggedIn: true };
}

export function useAuth(): AuthResponse {
  const sessionCookie = getCookie('session');
  if (!sessionCookie) return { data: null, isLoggedIn: false };
  return { data: JSON.parse(sessionCookie as string), isLoggedIn: true };
}
