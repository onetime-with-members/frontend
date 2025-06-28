import { getCookie } from 'cookies-next';

import { AuthResponse } from './types';

export function useAuth(): AuthResponse {
  const sessionCookie = getCookie('session');
  if (!sessionCookie) return { data: null, isLoggedIn: false };
  return { data: JSON.parse(sessionCookie as string), isLoggedIn: true };
}
