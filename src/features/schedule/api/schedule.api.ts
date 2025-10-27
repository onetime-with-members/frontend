import { ScheduleType } from '../models';
import { EventType } from '@/features/event/models';
import apiClient from '@/lib/api/axios';
import { SERVER_API_URL } from '@/lib/constants';

export async function fetchSchedules(event: EventType) {
  if (!event.eventId) return [];

  const res = await fetch(
    `${SERVER_API_URL}/schedules/${event.category.toLowerCase()}/${event.eventId}`,
  );
  if (!res.ok) {
    console.error(await res.json());
    return [];
  }
  const data = await res.json();

  return ScheduleType.fromResponse(data.payload);
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
    `/schedules/${event.category.toLowerCase()}/${event.eventId}/${isLoggedIn ? 'user' : guestId}`,
  );
  return res.data.payload;
}
