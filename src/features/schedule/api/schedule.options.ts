import { ScheduleGuideModalViewStatus, ScheduleType } from '../types';
import {
  fetchScheduleDetail,
  fetchScheduleGuideModalViewStatus,
  fetchSchedules,
} from './schedule.api';
import { defaultEvent } from '@/features/event/constants';
import { EventType } from '@/features/event/types';
import { queryOptions } from '@tanstack/react-query';

export const schedulesQueryOptions = (event: EventType) =>
  queryOptions({
    queryKey: ['schedules', event.category.toLowerCase(), event.event_id],
    queryFn: async () => await fetchSchedules(event),
    enabled: JSON.stringify(event) !== JSON.stringify(defaultEvent),
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
    enabled: JSON.stringify(event) !== JSON.stringify(defaultEvent),
  });

export const scheduleGuideModalViewStatusQueryOptions =
  queryOptions<ScheduleGuideModalViewStatus>({
    queryKey: [
      'users',
      'guides',
      'view-status',
      { guide_type: 'SCHEDULE_GUIDE_MODAL_001' },
    ],
    queryFn: fetchScheduleGuideModalViewStatus,
  });
