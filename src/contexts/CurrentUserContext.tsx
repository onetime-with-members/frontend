'use client';

import { getCookie } from 'cookies-next';
import { createContext, useEffect, useState } from 'react';

import { auth, currentUser } from '@/lib/auth';
import { UserType } from '@/lib/types';

export const CurrentUserContext = createContext<{
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  isPending: boolean;
}>({
  user: null,
  setUser: () => {},
  isPending: false,
});

export default function CurrentUserContextProvider({
  children,
  defaultUser,
}: {
  children: React.ReactNode;
  defaultUser: UserType | null;
}) {
  const [user, setUser] = useState<UserType | null>(defaultUser);
  const [isPending, setIsPending] = useState(true);

  const session = getCookie('session');

  useEffect(() => {
    async function fetchData() {
      if (!user) {
        if (await auth()) {
          setUser(await currentUser());
        }
      }
      setIsPending(false);
    }
    fetchData();
  }, [user, setUser, session]);

  return (
    <CurrentUserContext.Provider value={{ user, setUser, isPending }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
