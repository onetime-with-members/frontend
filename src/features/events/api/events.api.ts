import apiClient from '@/lib/api/axios';
import { SERVER_API_URL } from '@/lib/constants';
import { EventType } from '@/lib/types';
import { EventFormType } from '@/lib/validation/form-types';

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

export async function fetchEventWithAuth(eventId: string) {
  const res = await apiClient.get(`/events/${eventId}`);
  return res.data.payload;
}

export async function createEventAction(event: EventFormType) {
  const res = await apiClient.post('/events', event);
  return res.data.payload;
}

export async function editEventAction({
  eventId,
  event,
}: {
  eventId: string;
  event: EventFormType;
}) {
  const res = await apiClient.patch(`/events/${eventId}`, event);
  return res.data.payload;
}
