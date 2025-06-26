import { getCookie } from 'cookies-next';

import { Session } from './auth-action';

export interface AuthResponse {
  data: Session | null;
  isLoggedIn: boolean;
}

export function useAuth(): AuthResponse {
  const sessionCookie = getCookie('session');
  if (!sessionCookie) return { data: null, isLoggedIn: false };
  return { data: JSON.parse(sessionCookie as string), isLoggedIn: true };
}
