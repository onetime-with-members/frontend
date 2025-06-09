'use server';

import { accessToken, auth } from './auth';
import { SERVER_API_URL } from './constants';
import {
  BarBanner,
  EventType,
  MyEventType,
  MyScheduleTimeType,
  PolicyType,
  ScheduleType,
  SleepTimeType,
} from './types';

export async function fetchEvent(eventId: string) {
  const res = await fetch(`${SERVER_API_URL}/events/${eventId}`, {
    headers: {
      ...((await auth())
        ? { Authorization: `Bearer ${await accessToken()}` }
        : {}),
    },
  });
  if (!res.ok) {
    console.error(await res.json());
    throw new Error('Failed to fetch event');
  }
  const data = await res.json();
  const event: EventType = data.payload;

  return event;
}

export async function fetchSchedules(event: EventType | undefined) {
  const res = await fetch(
    `${SERVER_API_URL}/schedules/${event?.category.toLowerCase()}/${event?.event_id}`,
  );
  if (!res.ok) {
    console.error(await res.json());
    throw new Error('Failed to fetch schedules');
  }
  const data = await res.json();
  const schedules: ScheduleType[] = data.payload;

  return schedules;
}

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

export async function fetchMySchedule() {
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

export async function fetchOriginalUrl(shortUrl: string) {
  const res = await fetch(`${SERVER_API_URL}/urls/action-original`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      shorten_url: shortUrl,
    }),
  });
  if (!res.ok) {
    return {
      originalUrl: null,
      error: await res.json(),
    };
  }
  const data = await res.json();
  const { original_url } = data.payload;

  return {
    originalUrl: original_url,
    error: null,
  };
}

export async function fetchPolicy() {
  const res = await fetch(`${SERVER_API_URL}/users/policy`, {
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
    },
  });
  if (!res.ok) {
    console.error(await res.json());
    throw new Error('Failed to fetch sleep time');
  }
  const data = await res.json();
  const policy: PolicyType = data.payload;

  return policy;
}

export async function fetchBarBanner() {
  const res = await fetch(`${SERVER_API_URL}/banners/activated`);
  if (!res.ok) {
    console.error(await res.json());
    throw new Error('Failed to fetch bar banner');
  }
  const data = await res.json();
  const barBanner: BarBanner | null = data.payload;

  return barBanner;
}
