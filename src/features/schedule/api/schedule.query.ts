import {
  defaultScheduleDetail,
  defaultScheduleGuideModalViewLog,
} from '../constants';
import {
  checkNewGuest,
  closeScheduleGuideModal,
  createNewMemberSchedule,
  loginGuest,
  sendNewScheduleMessage,
  updateSchedule,
} from './schedule.api';
import {
  scheduleDetailQueryOptions,
  scheduleGuideModalViewLogQueryOptions,
  schedulesQueryOptions,
} from './schedule.option';
import { EventType } from '@/features/event/types';
import { isExampleEventSlug } from '@/features/event/utils';
import { useAuth } from '@/lib/auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useSchedulesQuery(event: EventType) {
  const { data, isPending } = useQuery({
    ...schedulesQueryOptions(event),
  });

  return { data: data || [], isPending };
}

export function useScheduleDetailQuery({
  event,
  isLoggedIn,
  guestId,
}: {
  event: EventType;
  isLoggedIn: boolean;
  guestId?: string;
}) {
  const { data } = useQuery({
    ...scheduleDetailQueryOptions({ event, isLoggedIn, guestId }),
  });

  return { data: data || defaultScheduleDetail };
}

export function useScheduleGuideModalViewLog() {
  const { isLoggedIn } = useAuth();

  const { data } = useQuery({
    ...scheduleGuideModalViewLogQueryOptions,
    enabled: isLoggedIn,
  });

  return { data: data || defaultScheduleGuideModalViewLog };
}

export function useCheckNewGuestMutation() {
  const { mutateAsync } = useMutation({
    mutationFn: ({ eventId, ...rest }: Parameters<typeof checkNewGuest>[0]) =>
      isExampleEventSlug(eventId)
        ? Promise.resolve({ is_possible: true })
        : checkNewGuest({ eventId, ...rest }),
  });

  return { mutateAsync };
}

export function useLoginGuestMutation() {
  const { mutateAsync } = useMutation({
    mutationFn: loginGuest,
  });

  return { mutateAsync };
}

export function useCreateNewMemberScheduleMutation() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({
      event,
      ...rest
    }: Parameters<typeof createNewMemberSchedule>[0]) =>
      isExampleEventSlug(event.event_id)
        ? Promise.resolve()
        : createNewMemberSchedule({ event, ...rest }),
    onSuccess: async (_, { event }) => {
      if (!isExampleEventSlug(event.event_id)) {
        await queryClient.invalidateQueries({ queryKey: ['schedules'] });
        await queryClient.invalidateQueries({ queryKey: ['events'] });
      }
    },
  });

  return { mutateAsync, isPending };
}

export function useUpdateScheduleMutation() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ event, ...rest }: Parameters<typeof updateSchedule>[0]) =>
      isExampleEventSlug(event.event_id)
        ? Promise.resolve()
        : updateSchedule({ event, ...rest }),
    onSuccess: async (_, { event }) => {
      if (!isExampleEventSlug(event.event_id)) {
        await queryClient.invalidateQueries({ queryKey: ['schedules'] });
        await queryClient.invalidateQueries({ queryKey: ['events'] });
      }
    },
  });

  return { mutateAsync, isPending };
}

export function useSendNewScheduleMessageMutation() {
  const { mutateAsync } = useMutation({
    mutationFn: (eventId: Parameters<typeof sendNewScheduleMessage>[0]) =>
      isExampleEventSlug(eventId)
        ? Promise.resolve()
        : sendNewScheduleMessage(eventId),
  });

  return { mutateAsync };
}

export function useCloseScheduleGuideModalMutation() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: closeScheduleGuideModal,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return { mutateAsync, isLoading: isPending || isSuccess };
}
