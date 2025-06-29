import { defaultMySchedule, defaultSleepTime } from '../constants';
import {
  EventType,
  MyEventType,
  MyScheduleTimeType,
  PolicyType,
  ScheduleType,
  SleepTimeType,
  UserType,
} from '../types';
import axios from './axios';
import {
  fetchQrCode,
  fetchRecommendedTimes,
  fetchSchedules,
  fetchShortenUrl,
} from './data';
import { queryOptions } from '@tanstack/react-query';

export const userQueryOptions = queryOptions<UserType>({
  queryKey: ['users', 'profile'],
  queryFn: async () => {
    const res = await axios.get('/users/profile');
    return res.data.payload;
  },
});

export const eventQueryOptions = (eventId: string) =>
  queryOptions<EventType>({
    queryKey: ['events', eventId],
    queryFn: async () => {
      const res = await axios.get(`/events/${eventId}`);
      return res.data.payload;
    },
  });

export const shortenUrlQueryOptions = (url: string) =>
  queryOptions({
    queryKey: ['urls', 'action-shorten'],
    queryFn: async () => await fetchShortenUrl(url),
  });

export const recommendedTimesQueryOptions = (eventId: string) =>
  queryOptions({
    queryKey: ['events', eventId, 'most'],
    queryFn: async () => await fetchRecommendedTimes(eventId),
  });

export const qrCodeQueryOptions = (eventId: string) =>
  queryOptions({
    queryKey: ['events', 'qr', eventId],
    queryFn: async () => await fetchQrCode(eventId),
  });

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
    queryFn: async () => {
      const res = await axios.get(
        `/schedules/${event.category.toLowerCase()}/${event.event_id}/${isLoggedIn ? 'user' : guestId}`,
      );
      return res.data.payload;
    },
  });

export const myEventsQueryOptions = queryOptions<MyEventType[]>({
  queryKey: ['events', 'user', 'all'],
  queryFn: async () => {
    const res = await axios.get('/events/user/all');
    return res.data.payload;
  },
});

export const myScheduleQueryOptions = queryOptions<MyScheduleTimeType[]>({
  queryKey: ['fixed-schedules'],
  queryFn: async () => {
    const res = await axios.get('/fixed-schedules');
    const myScheduleData: MyScheduleTimeType[] = res.data.payload.schedules;
    const mySchedule =
      myScheduleData.length !== 7
        ? defaultMySchedule.map((s1) => ({
            time_point: s1.time_point,
            times:
              myScheduleData.find((s2) => s1.time_point === s2.time_point)
                ?.times || [],
          }))
        : myScheduleData;
    return mySchedule;
  },
});

export const sleepTimeQueryOptions = queryOptions<SleepTimeType>({
  queryKey: ['users', 'sleep-time'],
  queryFn: async () => {
    const res = await axios.get('/users/sleep-time');
    return res.data.payload;
  },
  placeholderData: defaultSleepTime,
});

export const userPolicyQueryOptions = queryOptions<PolicyType>({
  queryKey: ['users', 'policy'],
  queryFn: async () => {
    const res = await axios.get('/users/policy');
    return res.data.payload;
  },
});
