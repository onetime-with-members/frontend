'use client';

import { createContext, useState } from 'react';

import {
  deleteSession as deleteSessionCookie,
  setSession as setSessionCookie,
} from '../lib/session';
import { Session } from '../types';

export const SessionContext = createContext<{
  session: Session | null;
  changeSession: (session: Session) => Promise<void>;
  deleteSession: () => Promise<void>;
}>({
  session: null,
  changeSession: async () => {},
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

  async function changeSession(session: Session) {
    await setSessionCookie(session);
    setSession(session);
  }

  async function deleteSession() {
    await deleteSessionCookie();
    setSession(null);
  }

  return (
    <SessionContext.Provider value={{ session, changeSession, deleteSession }}>
      {children}
    </SessionContext.Provider>
  );
}
