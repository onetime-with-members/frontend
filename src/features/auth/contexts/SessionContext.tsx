'use client';

import { createContext, useEffect, useState } from 'react';

import {
  deleteSession as deleteSessionCookie,
  setSession as setSessionCookie,
} from '../lib/session';
import { Session } from '@/features/auth/types';
import { useRouter } from '@/i18n/navigation';

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
  isInvalidSession,
}: {
  children: React.ReactNode;
  initialSession: Session | null;
  initialIsLoggedIn: boolean;
  isInvalidSession: boolean;
}) {
  const [session, setSession] = useState<Session | null>(initialSession);
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);

  const router = useRouter();

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

  useEffect(() => {
    (async () => {
      if (isInvalidSession) {
        await deleteSession();
        router.refresh();
      }
    })();
  }, [isInvalidSession]);

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
