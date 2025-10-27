import {
  scheduleDetailQueryOptions,
  schedulesQueryOptions,
} from './schedule.options';
import { EventType } from '@/features/event/models';
import { useQuery } from '@tanstack/react-query';

export function useSchedulesQuery(event: EventType) {
  const { data } = useQuery({ ...schedulesQueryOptions(event) });

  return { data };
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

  return { data };
}
