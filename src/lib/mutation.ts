import axios from './axios';
import { MyScheduleTimeType, SleepTimeType } from './types';

export async function editUserNameApi(name: string) {
  const res = await axios.patch('/users/profile/action-update', {
    nickname: name,
  });
  return res.data.payload;
}

export async function editMyScheduleApi(mySchedule: MyScheduleTimeType[]) {
  const res = await axios.put('/fixed-schedules', {
    schedules: mySchedule,
  });
  return res.data.payload;
}

export async function editSleepTimeApi(sleepTime: SleepTimeType) {
  const res = await axios.put('/users/sleep-time', sleepTime);
  return res.data.payload;
}
