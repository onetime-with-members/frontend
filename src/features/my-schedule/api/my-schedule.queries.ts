import { useContext } from 'react';

import {
  editMyScheduleAction,
  editSleepTimeAction,
  submitEverytimeUrlAction,
} from './my-schedule.api';
import {
  myScheduleQueryOptions,
  sleepTimeQueryOptions,
} from './my-schedule.options';
import { EverytimeScheduleContext } from '@/contexts/everytime-schedule';
import { ExtendedAxiosError } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useMyScheduleQuery({ enabled }: { enabled?: boolean } = {}) {
  const { data, isPending } = useQuery({
    ...myScheduleQueryOptions,
    enabled,
  });

  return { data, isPending };
}

export function useSleepTimeQuery({ enabled }: { enabled?: boolean } = {}) {
  const { data, isPending } = useQuery({
    ...sleepTimeQueryOptions,
    enabled,
  });

  return { data, isPending };
}

export function useEditMyScheduleMutation() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: editMyScheduleAction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['fixed-schedules'] });
    },
  });

  return {
    editMySchedule: mutateAsync,
    isPending,
  };
}

export function useEditSleepTimeMutation() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: editSleepTimeAction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return {
    editSleepTime: mutateAsync,
    isPending,
  };
}

export function useSubmitEverytimeURLMutation() {
  const { setEverytimeSchedule } = useContext(EverytimeScheduleContext);

  const { mutateAsync, error, isPending } = useMutation({
    mutationFn: submitEverytimeUrlAction,
    onSuccess: (data) => {
      setEverytimeSchedule(data);
    },
  });

  const axiosError = error as ExtendedAxiosError | null;

  return { submitEverytimeUrl: mutateAsync, error: axiosError, isPending };
}
