import { defaultEvent } from '../constants';
import { MemberFilterType } from '../types';
import {
  createEventAction,
  deleteEventAction,
  editEventAction,
  fetchFilteredRecommendedTimes,
  fetchFilteredSchedules,
} from './events.api';
import {
  eventQueryOptions,
  eventShortUrlQueryOptions,
  eventWithAuthQueryOptions,
  participantsQueryOptions,
  qrCodeQueryOptions,
  recommendedTimesQueryOptions,
} from './events.option';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useEventQuery(id: string) {
  const { data } = useQuery({ ...eventQueryOptions(id) });

  return { data: data || defaultEvent };
}

export function useEventWithAuthQuery({
  id,
  enabled,
}: {
  id: string;
  enabled?: boolean;
}) {
  const { data } = useQuery({
    ...eventWithAuthQueryOptions(id),
    enabled,
  });

  return { data };
}

export function useShortUrlQuery(url: string) {
  const { data } = useQuery({
    ...eventShortUrlQueryOptions(url),
  });

  return { data };
}

export function useRecommendedTimesQuery(eventId: string) {
  const { data } = useQuery({
    ...recommendedTimesQueryOptions(eventId),
  });

  return { data: data || [] };
}

export function useQrCodeQuery(eventId: string) {
  const { data } = useQuery({
    ...qrCodeQueryOptions(eventId),
  });

  return { data };
}

export function useParticipantsQuery(eventId: string) {
  const { data } = useQuery({
    ...participantsQueryOptions(eventId),
  });

  return { data: data || [] };
}

export function useCreateEventMutation() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createEventAction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  return { mutateAsync, isPending };
}

export function useEditEventMutation() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: editEventAction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  return { mutateAsync, isPending };
}

export function useDeleteEventMutation() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteEventAction,
    onSuccess: async (_, eventId) => {
      queryClient.removeQueries({ queryKey: ['events', eventId] });
      await queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  return { mutateAsync, isPending };
}

export function useChangeFilteredEventDataMutation({
  eventId,
  eventCategory,
}: {
  eventId: string;
  eventCategory: 'DATE' | 'DAY';
}) {
  const { mutateAsync } = useMutation({
    mutationFn: async (filter: MemberFilterType) => {
      const recommendedTimes = await fetchFilteredRecommendedTimes({
        eventId,
        filter,
      });
      const schedules = await fetchFilteredSchedules({
        eventId,
        category: eventCategory,
        filter,
      });
      return { recommendedTimes, schedules };
    },
  });

  return { mutateAsync };
}
