import apiClient from '@/lib/api/axios';
import { SERVER_API_URL } from '@/lib/constants';
import {
  EventType,
  ParticipantResponseType,
  ParticipantType,
  RecommendScheduleType,
} from '@/lib/types';
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

export async function fetchParticipants(eventId: string) {
  const res = await fetch(`${SERVER_API_URL}/events/${eventId}/participants`);
  if (!res.ok) {
    console.error(await res.json());
    return [];
  }
  const data = await res.json();
  const guests: ParticipantResponseType[] = data.payload.members;
  const users: ParticipantResponseType[] = data.payload.users;

  const participants: ParticipantType[] = guests
    .map((guest) => ({ ...guest, type: 'GUEST' as ParticipantType['type'] }))
    .concat(
      users.map((user) => ({
        ...user,
        type: 'USER' as ParticipantType['type'],
      })),
    );

  return participants;
}
