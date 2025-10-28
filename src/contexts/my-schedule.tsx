'use client';

import { createContext, useEffect, useState } from 'react';

import { useMyScheduleQuery } from '@/features/my-schedule/api/my-schedule.queries';
import { defaultMySchedule } from '@/features/my-schedule/constants';
import { MyScheduleTimeType } from '@/features/my-schedule/types';
import { useAuth } from '@/lib/auth/auth.client';
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
}: {
  children: React.ReactNode;
}) {
  const [isMyScheduleEdited, setIsMyScheduleEdited] = useState(false);

  const pathname = usePathname();

  const { isLoggedIn } = useAuth();

  const { data: myScheduleData } = useMyScheduleQuery({ enabled: isLoggedIn });

  const [mySchedule, setMySchedule] = useState<MyScheduleTimeType[]>(
    myScheduleData || defaultMySchedule,
  );

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
      '/mypage/schedule/edit',
      '/mypage/schedule/everytime/edit',
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
