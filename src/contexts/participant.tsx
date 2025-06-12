'use client';

import { createContext, useEffect, useState } from 'react';

import { ScheduleType } from '@/lib/types';

export const ParticipantContext = createContext<{
  participants: string[];
  isLoading: boolean;
}>({
  participants: [],
  isLoading: true,
});

export default function ParticipantContextProvider({
  children,
  schedules,
}: {
  children: React.ReactNode;
  schedules: ScheduleType[] | undefined;
}) {
  const [participants, setParticipants] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (schedules) {
      setParticipants(schedules.map((schedule) => schedule.name).sort());
      setIsLoading(false);
    }
  }, [schedules]);

  return (
    <ParticipantContext.Provider value={{ participants, isLoading }}>
      {children}
    </ParticipantContext.Provider>
  );
}
