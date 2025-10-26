import { SERVER_API_URL } from '../constants';
import { Banner, BarBanner, EventType, ScheduleType } from '../types';
import apiClient from './axios';

export async function fetchSchedules(event: EventType) {
  if (!event.event_id) return [];

  const res = await fetch(
    `${SERVER_API_URL}/schedules/${event.category.toLowerCase()}/${event.event_id}`,
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

export async function fetchBanner() {
  const res = await fetch(`${SERVER_API_URL}/admin/banners/activated/all`);
  if (!res.ok) {
    console.error(await res.json());
    return [];
  }
  const data = await res.json();
  const banners: Banner[] = data.payload.banners;

  return banners || [];
}

export async function fetchBarBanner() {
  const res = await fetch(`${SERVER_API_URL}/admin/bar-banners/activated/all`);
  if (!res.ok) {
    console.error(await res.json());
    return null;
  }
  const data = await res.json();
  const barBanners: BarBanner[] = data.payload.bar_banners;

  return barBanners.length !== 0 ? barBanners[0] : null;
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
  const res = await apiClient.get(
    `/schedules/${event.category.toLowerCase()}/${event.event_id}/${isLoggedIn ? 'user' : guestId}`,
  );
  return res.data.payload;
}

export async function fetchUserPolicy() {
  const res = await apiClient.get('/users/policy');
  const {
    service_policy_agreement,
    privacy_policy_agreement,
    marketing_policy_agreement,
  } = res.data.payload;
  return {
    servicePolicy: service_policy_agreement,
    privacyPolicy: privacy_policy_agreement,
    marketingPolicy: marketing_policy_agreement,
  };
}
