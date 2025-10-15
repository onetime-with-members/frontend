import { defaultMySchedule } from '../constants';
import { MyScheduleTimeType } from '../models/MyScheduleTimeType';
import apiClient from '@/lib/api/axios';

export async function fetchMySchedule() {
  const res = await apiClient.get('/fixed-schedules');
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
}

export async function fetchSleepTime() {
  const res = await apiClient.get('/users/sleep-time');
  return res.data.payload;
}
