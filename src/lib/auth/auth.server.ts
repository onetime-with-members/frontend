'use server';

import { AuthResponse } from '../types';
import { cookies } from 'next/headers';

export default async function auth(): Promise<AuthResponse> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');
  if (!sessionCookie) return { data: null, isLoggedIn: false };
  return { data: JSON.parse(sessionCookie.value as string), isLoggedIn: true };
}
