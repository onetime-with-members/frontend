import { fetchScheduleDetail, fetchSchedules } from '@/lib/data';
import { EventType, ScheduleType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

export const useScheduleQuery = (event: EventType | undefined) =>
  useQuery<ScheduleType[]>({
    queryKey: ['schedules', event?.category?.toLowerCase(), event?.event_id],
    queryFn: async () => await fetchSchedules(event),
    enabled: !!event,
  });

export const useScheduleDetailQuery = ({
  event,
  guestId,
  isNewGuest,
  isLoggedIn,
}: {
  event: EventType | undefined;
  guestId: string;
  isNewGuest: boolean;
  isLoggedIn: boolean;
}) =>
  useQuery<ScheduleType>({
    queryKey: [
      'schedules',
      event?.category?.toLowerCase(),
      event?.event_id,
      isLoggedIn ? 'user' : guestId,
    ],
    queryFn: async () => await fetchScheduleDetail(event, isLoggedIn, guestId),
    enabled:
      event !== undefined && !isNewGuest && (isLoggedIn || guestId !== ''),
  });
