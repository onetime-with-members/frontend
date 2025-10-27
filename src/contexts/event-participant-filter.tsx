'use client';

import { createContext, useState } from 'react';

import {
  useEventQuery,
  useRecommendedTimesQuery,
} from '@/features/event/api/events.query';
import {
  fetchFilteredRecommendedTimes,
  fetchFilteredSchedules,
} from '@/lib/api/actions';
import { schedulesQueryOptions } from '@/lib/api/query-options';
import { defaultEvent } from '@/lib/constants';
import {
  MemberFilterType,
  ParticipantType,
  RecommendScheduleType,
  ScheduleType,
} from '@/lib/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const EventParticipantFilterContext = createContext<{
  filteredParticipants: ParticipantType[];
  changeFilteredParticipants: (participant: ParticipantType) => void;
  recommendedTimes: RecommendScheduleType[];
  schedules: ScheduleType[];
}>({
  filteredParticipants: [],
  changeFilteredParticipants: () => {},
  recommendedTimes: [],
  schedules: [],
});

export default function EventParticipantFilterContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filteredParticipants, setFilteredParticipants] = useState<
    ParticipantType[]
  >([]);
  const [recommendedTimes, setRecommendedTimes] = useState<
    RecommendScheduleType[] | null
  >(null);
  const [schedules, setSchedules] = useState<ScheduleType[] | null>(null);

  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);
  const { data: recommendedTimesData } = useRecommendedTimesQuery(params.id);
  const { data: schedulesData } = useQuery({
    ...schedulesQueryOptions(event || defaultEvent),
  });

  const { mutate: changeFilteredData } = useMutation({
    mutationFn: async (filter: MemberFilterType) => {
      const recommendedTimes = await fetchFilteredRecommendedTimes({
        eventId: params.id,
        filter,
      });
      const schedules = await fetchFilteredSchedules({
        eventId: params.id,
        category: event?.category || 'DATE',
        filter,
      });
      return { recommendedTimes, schedules };
    },
    onSuccess: ({ recommendedTimes, schedules }, filter) => {
      const isFiltered = filter.guests.length + filter.users.length > 0;
      setRecommendedTimes(
        isFiltered ? recommendedTimes : recommendedTimesData || [],
      );
      setSchedules(isFiltered ? schedules : schedulesData || []);
    },
  });

  function changeFilteredParticipants(participant: ParticipantType) {
    setFilteredParticipants((prev) => {
      const newFilteredParticipants = prev.includes(participant)
        ? prev.filter((p) => p !== participant)
        : [...prev, participant];
      changeFilteredData({
        users: newFilteredParticipants
          .filter((p) => p.type === 'USER')
          .map((p) => p.id),
        guests: newFilteredParticipants
          .filter((p) => p.type === 'GUEST')
          .map((p) => p.id),
      });
      return newFilteredParticipants;
    });
  }

  return (
    <EventParticipantFilterContext.Provider
      value={{
        filteredParticipants,
        changeFilteredParticipants,
        recommendedTimes: recommendedTimes || recommendedTimesData || [],
        schedules: schedules || schedulesData || [],
      }}
    >
      {children}
    </EventParticipantFilterContext.Provider>
  );
}
