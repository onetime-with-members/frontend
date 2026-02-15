import { defaultEvent } from '../constants';
import { EventType, MemberFilterType } from '../types';
import { isExampleEventSlug } from '../utils';
import {
  createEventAction,
  createTalkCalendarEvent,
  deleteEventAction,
  editEventAction,
  fetchFilteredRecommendedTimes,
  fetchFilteredSchedules,
} from './event.api';
import {
  eventQueryOptions,
  eventShortUrlQueryOptions,
  eventWithAuthQueryOptions,
  participantsQueryOptions,
  qrCodeQueryOptions,
  recommendedTimesQueryOptions,
} from './event.option';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useEventQuery(id: string) {
  const { data, isPending } = useQuery({
    ...eventQueryOptions(id),
  });

  return { data: data || defaultEvent, isPending };
}

export function useEventWithAuthQuery(id: string) {
  const { data } = useQuery({
    ...eventWithAuthQueryOptions(id),
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

  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: createEventAction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  return { mutateAsync, isLoading: isPending || isSuccess };
}

export function useEditEventMutation() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: ({
      eventId,
      ...rest
    }: Parameters<typeof editEventAction>[0]) =>
      isExampleEventSlug(eventId)
        ? Promise.resolve()
        : editEventAction({ eventId, ...rest }),
    onSuccess: async (_, { eventId }) => {
      if (!isExampleEventSlug(eventId)) {
        await queryClient.invalidateQueries({ queryKey: ['events'] });
      }
    },
  });

  return { mutateAsync, isLoading: isPending || isSuccess };
}

export function useDeleteEventMutation() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: deleteEventAction,
    onSuccess: async (_, eventId) => {
      queryClient.removeQueries({ queryKey: ['events', eventId] });
      await queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  return { mutateAsync, isLoading: isPending || isSuccess };
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

export function useCreateTalkCalendarEvent() {
  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: async ({
      accessToken,
      event,
    }: {
      accessToken: string;
      event: EventType;
    }) => await createTalkCalendarEvent(accessToken, event),
  });

  return { mutateAsync, isPending, isSuccess };
}
