import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { EventSectionHeading } from '../heading';
import ParticipantFilterItem from './ParticipantFilterItem';
import HumanIcon from '@/components/icon/HumanIcon';
import {
  fetchFilteredRecommendedTimes,
  fetchFilteredSchedules,
} from '@/lib/api/actions';
import {
  eventQueryOptions,
  filteredRecommendedTimesQueryOptions,
  filteredSchedulesQueryOptions,
  participantsQueryOptions,
} from '@/lib/api/query-options';
import { MemberFilterType, ParticipantType } from '@/lib/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function ParticipantFilter() {
  const [filteredParticipants, setFilteredParticipants] = useState<
    ParticipantType[]
  >([]);

  const params = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const t = useTranslations('eventDetail');

  const { data: event } = useQuery({ ...eventQueryOptions(params.id) });
  const { data: participantsData } = useQuery({
    ...participantsQueryOptions(params.id),
  });
  const participants = participantsData || [];

  const { mutate: changeFilteredData } = useMutation({
    mutationFn: async (filter: MemberFilterType) => {
      const recommededTimes = await fetchFilteredRecommendedTimes({
        eventId: params.id,
        filter,
      });
      const schedules = await fetchFilteredSchedules({
        eventId: params.id,
        category: event?.category || 'DATE',
        filter,
      });
      return { recommededTimes, schedules };
    },
    onSuccess: ({ recommededTimes, schedules }) => {
      queryClient.setQueryData(
        filteredRecommendedTimesQueryOptions(params.id).queryKey,
        recommededTimes,
      );
      queryClient.setQueryData(
        filteredSchedulesQueryOptions({
          eventId: params.id,
          category: event?.category || 'DATE',
        }).queryKey,
        schedules,
      );
    },
  });

  function handleFilterItemClick(participantId: number) {
    setFilteredParticipants((prev) => {
      const newFilteredParticipants = prev
        .map((participant) => participant.id)
        .includes(participantId)
        ? prev.filter((participant) => participant.id !== participantId)
        : [
            ...prev,
            participants.find(
              (participant) => participant.id === participantId,
            )!,
          ];
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
    participants.length > 0 && (
      <>
        <EventSectionHeading
          icon={<HumanIcon fontSize={20} className="mr-0.5" />}
          status={<>{participants.length}</>}
          className="pt-2"
          sticky
        >
          {t('participant', { count: participants.length })}
        </EventSectionHeading>
        <ul className="mt-2 flex flex-wrap gap-1.5 pb-4 pt-0 md:pb-6">
          {participants.map((participant) => (
            <ParticipantFilterItem
              key={participant.id}
              active={filteredParticipants.includes(participant)}
              onClick={() => handleFilterItemClick(participant.id)}
            >
              {participant.name}
            </ParticipantFilterItem>
          ))}
        </ul>
      </>
    )
  );
}
