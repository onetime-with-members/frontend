import axios from './axios';
import { defaultMySchedule } from './constants';
import { MyEventType, MyScheduleTimeType, UserType } from './types';
import { queryOptions } from '@tanstack/react-query';

export const userQueryOption = queryOptions<UserType>({
  queryKey: ['users', 'profile'],
  queryFn: async () => {
    const res = await axios.get('/users/profile');
    return res.data.payload;
  },
});

export const myEventsQueryOption = queryOptions<MyEventType[]>({
  queryKey: ['events', 'user', 'all'],
  queryFn: async () => {
    const res = await axios.get('/events/user/all');
    return res.data.payload;
  },
});

export const myScheduleQueryOption = queryOptions<MyScheduleTimeType[]>({
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

export const sleepTimeQueryOption = queryOptions({
  queryKey: ['users', 'sleep-time'],
  queryFn: async () => {
    const res = await axios.get('/users/sleep-time');
    return res.data.payload;
  },
});
