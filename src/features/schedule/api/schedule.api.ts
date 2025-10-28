import { ScheduleType } from '../types';
import { EventType } from '@/features/event/types';
import apiClient from '@/lib/api/axios';
import { SERVER_API_URL } from '@/lib/constants';

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
