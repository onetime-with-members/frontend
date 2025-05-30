'use server';

import { accessToken } from './auth';
import { SERVER_API_URL } from './constants';
import { MyEventType, MyScheduleTimeType, SleepTimeType } from './types';

export async function fetchMyEvents() {
  const res = await fetch(`${SERVER_API_URL}/events/user/all`, {
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
    },
  });
  if (!res.ok) {
    console.error(await res.json());
    throw new Error('Failed to fetch my events');
  }
  const data = await res.json();
  const events: MyEventType[] = data.payload;

  return events;
}

export async function fetchMySchedules() {
  const res = await fetch(`${SERVER_API_URL}/fixed-schedules`, {
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
    },
  });
  if (!res.ok) {
    console.error(await res.json());
    throw new Error('Failed to fetch my schedule');
  }
  const data = await res.json();
  const mySchedule: MyScheduleTimeType[] = data.payload.schedules;

  return mySchedule;
}

export async function fetchSleepTime() {
  const res = await fetch(`${SERVER_API_URL}/users/sleep-time`, {
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
    },
  });
  if (!res.ok) {
    console.error(await res.json());
    throw new Error('Failed to fetch sleep time');
  }
  const data = await res.json();
  const sleepTime: SleepTimeType = data.payload;

  return sleepTime;
}
