'use client';

import { createContext, useState } from 'react';

import {
  useChangeFilteredEventDataMutation,
  useEventQuery,
  useRecommendedTimesQuery,
} from '@/features/event/api/events.query';
import { ParticipantType, RecommendScheduleType } from '@/features/event/types';
import { useSchedulesQuery } from '@/features/schedule/api/schedule.query';
import { ScheduleType } from '@/features/schedule/types';
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
  const { data: schedulesData } = useSchedulesQuery(event);

  const { mutateAsync: changeFilteredEventData } =
    useChangeFilteredEventDataMutation({
      eventId: params.id,
      eventCategory: event.category,
    });

  async function changeFilteredParticipants(participant: ParticipantType) {
    const newFilteredParticipants = filteredParticipants.includes(participant)
      ? filteredParticipants.filter((p) => p !== participant)
      : [...filteredParticipants, participant];
    const filter = {
      users: newFilteredParticipants
        .filter((p) => p.type === 'USER')
        .map((p) => p.id),
      guests: newFilteredParticipants
        .filter((p) => p.type === 'GUEST')
        .map((p) => p.id),
    };
    const isFiltered = filter.guests.length + filter.users.length > 0;

    const data = await changeFilteredEventData(filter);

    setRecommendedTimes(
      isFiltered ? data.recommendedTimes : recommendedTimesData,
    );
    setSchedules(isFiltered ? data.schedules : schedulesData);
    setFilteredParticipants(newFilteredParticipants);
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
