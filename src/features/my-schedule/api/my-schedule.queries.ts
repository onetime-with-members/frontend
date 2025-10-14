import {
  myScheduleQueryOptions,
  sleepTimeQueryOptions,
} from './my-schedule.options';
import { useQuery } from '@tanstack/react-query';

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
