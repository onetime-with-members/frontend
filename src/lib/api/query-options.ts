import { Banner, EventType, ScheduleType } from '../types';
import { PolicyFormType } from '../validation/form-types';
import {
  fetchBanner,
  fetchScheduleDetail,
  fetchSchedules,
  fetchUserPolicy,
} from './data';
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

export const userPolicyQueryOptions = queryOptions<PolicyFormType>({
  queryKey: ['users', 'policy'],
  queryFn: fetchUserPolicy,
});

export const bannerQueryOptions = queryOptions<Banner[]>({
  queryKey: ['banner'],
  queryFn: fetchBanner,
});
