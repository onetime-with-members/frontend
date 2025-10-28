import { ScheduleType } from '../types';
import { fetchScheduleDetail, fetchSchedules } from './schedule.api';
import { EventType } from '@/features/event/types';
import { queryOptions } from '@tanstack/react-query';

export const schedulesQueryOptions = (event: EventType) =>
  queryOptions({
    queryKey: ['schedules', event.category.toLowerCase(), event.event_id],
    queryFn: async () => await fetchSchedules(event),
  });

export const scheduleDetailQueryOptions = ({
  event,
  isLoggedIn,
  guestId,
}: {
  event: EventType;
  isLoggedIn: boolean;
  guestId?: string;
}) =>
  queryOptions<ScheduleType>({
    queryKey: [
      'schedules',
      event.category.toLowerCase(),
      event.event_id,
      isLoggedIn ? 'user' : guestId,
    ],
    queryFn: async () =>
      await fetchScheduleDetail({ event, isLoggedIn, guestId }),
  });
