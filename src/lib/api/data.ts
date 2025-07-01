import { SERVER_API_URL, defaultMySchedule } from '../constants';
import {
  BarBanner,
  EventType,
  MyScheduleTimeType,
  RecommendScheduleType,
  ScheduleType,
} from '../types';
import axios from './axios';

export async function fetchEvent(eventId: string) {
  const res = await fetch(`${SERVER_API_URL}/events/${eventId}`);
  if (!res.ok) {
    const error = await res.json();
    console.error(error);
    return null;
  }
  const data = await res.json();
  const event: EventType = data.payload;

  return event;
}

export async function fetchShortenUrl(originalUrl: string) {
  const res = await fetch(`${SERVER_API_URL}/urls/action-shorten`, {
    method: 'POST',
    headers: {
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
  const res = await fetch(`${SERVER_API_URL}/events/${eventId}/most`);
  if (!res.ok) {
    console.error(await res.json());
    return [];
  }
  const data = await res.json();
  const recommendedTimes: RecommendScheduleType[] = data.payload;

  return recommendedTimes;
}

export async function fetchSchedules(event: EventType) {
  const res = await fetch(
    `${SERVER_API_URL}/schedules/${event?.category.toLowerCase()}/${event?.event_id}`,
  );
  if (!res.ok) {
    console.error(await res.json());
    return [];
  }
  const data = await res.json();
  const schedules: ScheduleType[] = data.payload;

  return schedules;
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

export async function fetchUserProfile() {
  const res = await axios.get('/users/profile');
  return res.data.payload;
}

export async function fetchEventWithAuth(eventId: string) {
  const res = await axios.get(`/events/${eventId}`);
  return res.data.payload;
}

export async function fetchScheduleDetail({
  event,
  isLoggedIn,
  guestId,
}: {
  event: EventType;
  isLoggedIn: boolean;
  guestId: string | undefined;
}) {
  const res = await axios.get(
    `/schedules/${event.category.toLowerCase()}/${event.event_id}/${isLoggedIn ? 'user' : guestId}`,
  );
  return res.data.payload;
}

export async function fetchMyEvents() {
  const res = await axios.get('/events/user/all');
  return res.data.payload;
}

export async function fetchMySchedule() {
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
}

export async function fetchSleepTime() {
  const res = await axios.get('/users/sleep-time');
  return res.data.payload;
}

export async function fetchUserPolicy() {
  const res = await axios.get('/users/policy');
  return res.data.payload;
}
