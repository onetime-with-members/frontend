'use client';

import { createContext, useState } from 'react';

import { EverytimeSchedule } from '@/features/my-schedule/models';

export const EverytimeScheduleContext = createContext<{
  everytimeSchedule: EverytimeSchedule;
  setEverytimeSchedule: React.Dispatch<React.SetStateAction<EverytimeSchedule>>;
}>({
  everytimeSchedule: [],
  setEverytimeSchedule: () => {},
});

export default function EverytimeScheduleContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [everytimeSchedule, setEverytimeSchedule] = useState<EverytimeSchedule>(
    [],
  );

  return (
    <EverytimeScheduleContext.Provider
      value={{ everytimeSchedule, setEverytimeSchedule }}
    >
      {children}
    </EverytimeScheduleContext.Provider>
  );
}
