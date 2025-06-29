'use client';

import { createContext, useEffect, useState } from 'react';

import { useAuth } from '@/lib/api/auth.client';
import { myScheduleQueryOptions } from '@/lib/api/query-options';
import { defaultMySchedule } from '@/lib/constants';
import { MyScheduleTimeType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

export const MyScheduleContext = createContext<{
  mySchedule: MyScheduleTimeType[];
  setMySchedule: React.Dispatch<React.SetStateAction<MyScheduleTimeType[]>>;
  isMyScheduleEdited: boolean;
  setIsMyScheduleEdited: React.Dispatch<React.SetStateAction<boolean>>;
  resetMySchedule: () => void;
}>({
  mySchedule: [],
  setMySchedule: () => {},
  isMyScheduleEdited: false,
  setIsMyScheduleEdited: () => {},
  resetMySchedule: () => {},
});

export default function MyScheduleContextProvider({
  children,
  defaultMySchedule: fetchedMySchedule,
}: {
  children: React.ReactNode;
  defaultMySchedule: MyScheduleTimeType[] | undefined;
}) {
  const [mySchedule, setMySchedule] = useState<MyScheduleTimeType[]>(
    fetchedMySchedule || defaultMySchedule,
  );
  const [isMyScheduleEdited, setIsMyScheduleEdited] = useState(false);

  const pathname = usePathname();

  const { isLoggedIn } = useAuth();

  const { data: myScheduleData } = useQuery({
    ...myScheduleQueryOptions,
    enabled: isLoggedIn,
  });

  function resetMySchedule() {
    setMySchedule(myScheduleData || defaultMySchedule);
    setIsMyScheduleEdited(false);
  }

  useEffect(() => {
    if (!myScheduleData) return;
    setMySchedule(myScheduleData);
  }, [myScheduleData]);

  useEffect(() => {
    const locationsNotToReset = [
      '/mypage/schedules/edit',
      '/mypage/schedules/everytime/edit',
    ];
    if (locationsNotToReset.includes(pathname)) return;
    resetMySchedule();
  }, [pathname]);

  return (
    <MyScheduleContext.Provider
      value={{
        mySchedule,
        setMySchedule,
        isMyScheduleEdited,
        setIsMyScheduleEdited,
        resetMySchedule,
      }}
    >
      {children}
    </MyScheduleContext.Provider>
  );
}
