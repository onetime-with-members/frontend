import { defaultMySchedule } from '../constants';
import { SleepTimeType } from '../models';
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

export async function editMyScheduleAction(mySchedule: MyScheduleTimeType[]) {
  const res = await apiClient.put('/fixed-schedules', {
    schedules: mySchedule,
  });
  return res.data.payload;
}

export async function editSleepTimeAction(sleepTime: SleepTimeType) {
  const res = await apiClient.put('/users/sleep-time', sleepTime);
  return res.data.payload;
}
