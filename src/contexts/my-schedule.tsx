'use client';

import { createContext, useEffect, useState } from 'react';

import { auth } from '@/lib/auth';
import { defaultMySchedule } from '@/lib/constants';
import { fetchMySchedule } from '@/lib/data';
import { MyScheduleTimeType } from '@/lib/types';
import { usePathname } from 'next/navigation';

export const MyScheduleContext = createContext<{
  mySchedule: MyScheduleTimeType[];
  setMySchedule: React.Dispatch<React.SetStateAction<MyScheduleTimeType[]>>;
  isMyScheduleEdited: boolean;
  setIsMyScheduleEdited: React.Dispatch<React.SetStateAction<boolean>>;
  resetMySchedule: () => void;
  revalidateMySchedule: () => void;
}>({
  mySchedule: [],
  setMySchedule: () => {},
  isMyScheduleEdited: false,
  setIsMyScheduleEdited: () => {},
  resetMySchedule: () => {},
  revalidateMySchedule: () => {},
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

  function resetMySchedule() {
    setMySchedule(defaultMySchedule);
    setIsMyScheduleEdited(false);
  }

  async function revalidateMySchedule() {
    if (!(await auth())) return;
    const data = await fetchMySchedule();
    if (!data) return;
    setMySchedule(data);
  }

  useEffect(() => {
    revalidateMySchedule();
  }, []);

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
        revalidateMySchedule,
      }}
    >
      {children}
    </MyScheduleContext.Provider>
  );
}
