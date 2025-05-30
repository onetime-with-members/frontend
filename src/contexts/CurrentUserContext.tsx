import { getCookie } from 'cookies-next';
import { createContext, useEffect, useState } from 'react';

import { auth, currentUser } from '@/lib/actions';
import { UserType } from '@/lib/types';

interface CurrentUserContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  isPending: boolean;
}

export const CurrentUserContext = createContext<CurrentUserContextType>({
  user: null,
  setUser: () => {},
  isPending: false,
});

export default function CurrentUserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserType | null>(null);
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
