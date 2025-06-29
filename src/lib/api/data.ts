import {
  SERVER_API_URL,
  defaultEvent,
  defaultMySchedule,
  defaultPolicy,
  defaultScheduleDetail,
  defaultSleepTime,
} from '../constants';
import {
  BarBanner,
  EventType,
  MyEventType,
  MyScheduleTimeType,
  PolicyType,
  RecommendScheduleType,
  ScheduleType,
  SleepTimeType,
} from '../types';
import auth from './auth.server';
import { notFound } from 'next/navigation';

export async function fetchEventServer(eventId: string) {
  const res = await fetch(`${SERVER_API_URL}/events/${eventId}`);
  if (!res.ok) {
    const error = await res.json();
    console.error(error);
    if (error.code === 'EVENT-001') {
      notFound();
    }
    return defaultEvent;
  }
  const data = await res.json();
  const event: EventType = data.payload;

  return event;
}

export async function fetchShortenUrl(originalUrl: string) {
  const { data: session, isLoggedIn } = await auth();

  const res = await fetch(`${SERVER_API_URL}/urls/action-shorten`, {
    method: 'POST',
    headers: {
      ...(isLoggedIn
        ? { Authorization: `Bearer ${session?.accessToken}` }
        : {}),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      original_url: originalUrl,
    }),
  });
  if (!res.ok) {
    console.error(await res.json());
    return '';
  }
  const data = await res.json();
  const shortenUrl: string = data.payload.shorten_url;

  return shortenUrl;
}

export async function fetchRecommendedTimes(eventId: string) {
  const { data: session, isLoggedIn } = await auth();

  const res = await fetch(`${SERVER_API_URL}/events/${eventId}/most`, {
    headers: {
      ...(isLoggedIn
        ? { Authorization: `Bearer ${session?.accessToken}` }
        : {}),
    },
  });
  if (!res.ok) {
    console.error(await res.json());
    return [];
  }
  const data = await res.json();
  const recommendedTimes: RecommendScheduleType[] = data.payload;

  return recommendedTimes;
}

export async function fetchSchedules(event: EventType) {
  const { data: session, isLoggedIn } = await auth();

  const res = await fetch(
    `${SERVER_API_URL}/schedules/${event?.category.toLowerCase()}/${event?.event_id}`,
    {
      headers: {
        ...(isLoggedIn
          ? { Authorization: `Bearer ${session?.accessToken}` }
          : {}),
      },
    },
  );
  if (!res.ok) {
    console.error(await res.json());
    return [];
  }
  const data = await res.json();
  const schedules: ScheduleType[] = data.payload;

  return schedules;
}

export async function fetchScheduleDetail(
  event: EventType | undefined,
  guestId: string,
) {
  const { data: session, isLoggedIn } = await auth();

  const res = await fetch(
    `${SERVER_API_URL}/schedules/${event?.category.toLowerCase()}/${event?.event_id}/${isLoggedIn ? 'user' : guestId}`,
    {
      headers: {
        ...(isLoggedIn
          ? { Authorization: `Bearer ${session?.accessToken}` }
          : {}),
      },
    },
  );
  if (!res.ok) {
    console.error(await res.json());
    return defaultScheduleDetail;
  }
  const data = await res.json();
  const schedule: ScheduleType = data.payload;

  return schedule;
}

export async function fetchMyEvents() {
  const { data: session } = await auth();

  const res = await fetch(`${SERVER_API_URL}/events/user/all`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  if (!res.ok) {
    console.error(await res.json());
    return [];
  }
  const data = await res.json();
  const events: MyEventType[] = data.payload;

  return events;
}

export async function fetchMySchedule() {
  const { data: session } = await auth();

  const res = await fetch(`${SERVER_API_URL}/fixed-schedules`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  if (!res.ok) {
    console.error(await res.json());
    return [];
  }
  const data = await res.json();
  const myScheduleData: MyScheduleTimeType[] = data.payload.schedules;

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
  const { data: session } = await auth();

  const res = await fetch(`${SERVER_API_URL}/users/sleep-time`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  if (!res.ok) {
    console.error(await res.json());
    return defaultSleepTime;
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
  const { data: session } = await auth();

  const res = await fetch(`${SERVER_API_URL}/users/policy`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  if (!res.ok) {
    console.error(await res.json());
    return defaultPolicy;
  }
  const data = await res.json();
  const policy: PolicyType = data.payload;

  return policy;
}

export async function fetchBarBanner() {
  const res = await fetch(`${SERVER_API_URL}/banners/activated`);
  if (!res.ok) {
    console.error(await res.json());
    return null;
  }
  const data = await res.json();
  const barBanner: BarBanner = data.payload;

  return barBanner || null;
}

export async function fetchQrCode(eventId: string) {
  const res = await fetch(`${SERVER_API_URL}/events/qr/${eventId}`);
  if (!res.ok) {
    console.error(await res.json());
    return '';
  }
  const data = await res.json();
  const qrCode: string = data.payload.qr_code_img_url;

  return qrCode;
}
