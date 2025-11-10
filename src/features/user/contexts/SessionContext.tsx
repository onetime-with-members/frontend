'use client';

import { deleteCookie, setCookie } from 'cookies-next';
import { createContext, useState } from 'react';

import { Session } from '../types';
import dayjs from '@/lib/dayjs';

export const SessionContext = createContext<{
  session: Session | null;
  changeSessionTokens: (session: Session) => Promise<void>;
  deleteSession: () => Promise<void>;
}>({
  session: null,
  changeSessionTokens: async () => {},
  deleteSession: async () => {},
});

export default function SessionContextProvider({
  children,
  initialSession,
}: {
  children: React.ReactNode;
  initialSession: Session | null;
}) {
  const [session, setSession] = useState<Session | null>(initialSession);

  async function changeSessionTokens({ accessToken, refreshToken }: Session) {
    await setCookie(
      'session',
      JSON.stringify({
        accessToken,
        refreshToken,
      } satisfies Session),
      { expires: dayjs().add(1, 'month').toDate() },
    );
    setSession({ accessToken, refreshToken });
  }

  async function deleteSession() {
    await deleteCookie('session');
    setSession(null);
  }

  return (
    <SessionContext.Provider
      value={{ session, changeSessionTokens, deleteSession }}
    >
      {children}
    </SessionContext.Provider>
  );
}
