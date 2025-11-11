'use client';

import { createContext, useState } from 'react';

import {
  deleteSession as deleteSessionCookie,
  setSession as setSessionCookie,
} from '../lib/session';
import { Session } from '@/features/auth/types';

export const SessionContext = createContext<{
  session: Session | null;
  isLoggedIn: boolean;
  signInSession: (session: Session) => Promise<void>;
  deleteSession: () => Promise<void>;
}>({
  session: null,
  isLoggedIn: false,
  signInSession: async () => {},
  deleteSession: async () => {},
});

export default function SessionContextProvider({
  children,
  initialSession,
  initialIsLoggedIn,
}: {
  children: React.ReactNode;
  initialSession: Session | null;
  initialIsLoggedIn: boolean;
}) {
  const [session, setSession] = useState<Session | null>(initialSession);
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);

  async function signInSession(session: Session) {
    await setSessionCookie(session);
    setSession(session);
    setIsLoggedIn(true);
  }

  async function deleteSession() {
    await deleteSessionCookie();
    setSession(null);
    setIsLoggedIn(false);
  }

  return (
    <SessionContext.Provider
      value={{
        session,
        isLoggedIn,
        signInSession,
        deleteSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
