'use client';

import { getCookie } from 'cookies-next';
import { createContext, useEffect, useState } from 'react';

import { auth, currentUser } from '@/lib/auth';
import { UserType } from '@/lib/types';

export const CurrentUserContext = createContext<{
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}>({
  user: null,
  setUser: () => {},
});

export default function CurrentUserContextProvider({
  children,
  defaultUser,
}: {
  children: React.ReactNode;
  defaultUser: UserType | null;
}) {
  const [user, setUser] = useState<UserType | null>(defaultUser);

  const session = getCookie('session');

  useEffect(() => {
    async function fetchData() {
      if (!user && (await auth())) setUser(await currentUser());
    }
    fetchData();
  }, [user, setUser, session]);

  return (
    <CurrentUserContext.Provider value={{ user, setUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
