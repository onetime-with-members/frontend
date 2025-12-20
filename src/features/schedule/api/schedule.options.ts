import { exampleSchedulesList } from '../mocks/example-schedules';
import { ScheduleGuideModalViewLog, ScheduleType } from '../types';
import {
  fetchScheduleDetail,
  fetchScheduleGuideModalViewLog,
  fetchSchedules,
} from './schedule.api';
import { defaultEvent } from '@/features/event/constants';
import { EventType } from '@/features/event/types';
import { queryOptions } from '@tanstack/react-query';

const exampleSchedulesOptions = (eventId: string) => ({
  initialData: () => {
    let result = undefined;
    exampleSchedulesList.forEach(({ slug, schedules }) => {
      if (slug.includes(eventId)) {
        result = schedules;
        return;
      }
    });
    return result;
  },
  staleTime: exampleSchedulesList.map(({ slug }) => slug).includes(eventId)
    ? Infinity
    : 0,
});

export const schedulesQueryOptions = (event: EventType) =>
  queryOptions({
    queryKey: ['schedules', event.category.toLowerCase(), event.event_id],
    queryFn: async () => await fetchSchedules(event),
    enabled: JSON.stringify(event) !== JSON.stringify(defaultEvent),
    ...exampleSchedulesOptions(event.event_id),
  });

export const scheduleDetailQueryOptions = ({
  event,
  isLoggedIn,
  guestId,
}: {
  event: EventType;
  isLoggedIn: boolean;
  guestId?: string;
}) => {
  const isEventValid = JSON.stringify(event) !== JSON.stringify(defaultEvent);
  const isAuthValid = isLoggedIn || !!guestId;

  return queryOptions<ScheduleType>({
    queryKey: [
      'schedules',
      event.category.toLowerCase(),
      event.event_id,
      isLoggedIn ? 'user' : guestId,
    ],
    queryFn: () => fetchScheduleDetail({ event, isLoggedIn, guestId }),
    enabled: isEventValid && isAuthValid,
  });
};

export const scheduleGuideModalViewLogQueryOptions =
  queryOptions<ScheduleGuideModalViewLog>({
    queryKey: [
      'users',
      'guides',
      'view-log',
      { guide_type: 'SCHEDULE_GUIDE_MODAL_001' },
    ],
    queryFn: fetchScheduleGuideModalViewLog,
  });
