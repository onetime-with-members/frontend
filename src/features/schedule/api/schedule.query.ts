import { defaultScheduleDetail } from '../constants';
import {
  checkNewGuest,
  createNewMemberSchedule,
  loginGuest,
  updateSchedule,
} from './schedule.api';
import {
  scheduleDetailQueryOptions,
  schedulesQueryOptions,
} from './schedule.options';
import { EventType } from '@/features/event/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useSchedulesQuery(event: EventType) {
  const { data } = useQuery({ ...schedulesQueryOptions(event) });

  return { data: data || [] };
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

export function useCheckNewGuestMutation() {
  const { mutateAsync } = useMutation({
    mutationFn: checkNewGuest,
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
    mutationFn: createNewMemberSchedule,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
      await queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });

  return { mutateAsync, isPending };
}

export function useUpdateScheduleMutation() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateSchedule,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
      await queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });

  return { mutateAsync, isPending };
}
