import {
  ConfirmEventRequestData,
  EventSchema,
  EventType,
  MemberFilterType,
  ParticipantResponseType,
  ParticipantType,
  RecommendedScheduleType,
} from '../types';
import { SERVER_API_URL, weekdaysShortKo } from '@/constants';
import { ScheduleType } from '@/features/schedule/types';
import apiClient from '@/lib/api';
import dayjs from '@/lib/dayjs';

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

export async function createEventAction(event: EventSchema) {
  const res = await apiClient.post('/events', event);
  return res.data.payload;
}

export async function editEventAction({
  eventId,
  event,
}: {
  eventId: string;
  event: EventSchema;
}) {
  const res = await apiClient.patch(`/events/${eventId}`, event);
  return res.data.payload;
}

export async function deleteEventAction(eventId: string) {
  const res = await apiClient.delete(`/events/${eventId}`);
  return res.data.payload;
}

export async function fetchShortUrl(originalUrl: string) {
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
  const shortUrl: string = data.payload.shorten_url;

  return shortUrl;
}

export async function fetchRecommendedTimes(eventId: string) {
  const res = await fetch(`${SERVER_API_URL}/events/${eventId}/most`);
  if (!res.ok) {
    console.error(await res.json());
    return [];
  }
  const data = await res.json();
  const recommendedTimes: RecommendedScheduleType[] = data.payload;

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

export async function fetchFilteredRecommendedTimes({
  eventId,
  filter,
}: {
  eventId: string;
  filter: MemberFilterType;
}) {
  const res = await apiClient.post(`/events/${eventId}/most/filtering`, {
    users: filter.users,
    members: filter.guests,
  });
  const recommendedTimes: RecommendedScheduleType[] = res.data.payload;
  return recommendedTimes;
}

export async function fetchFilteredSchedules({
  eventId,
  category,
  filter,
}: {
  eventId: string;
  category: EventType['category'];
  filter: MemberFilterType;
}) {
  const res = await apiClient.post(
    `/schedules/${category.toLowerCase()}/${eventId}/filtering`,
    {
      users: filter.users,
      members: filter.guests,
    },
  );
  const schedules: ScheduleType[] = res.data.payload;
  return schedules;
}

export async function confirmEvent(
  eventId: string,
  data: ConfirmEventRequestData,
) {
  const res = await apiClient.put(`/events/${eventId}/confirm`, data);
  return res.data.payload;
}

export async function createTalkCalendarEvent(
  accessToken: string,
  event: EventType,
) {
  const confirmedTime = event.confirmation;

  const res = await fetch(
    'https://kapi.kakao.com/v2/api/calendar/create/event',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${accessToken}`,
      },
      body: new URLSearchParams({
        event: JSON.stringify({
          title: event.title,
          time: {
            start_at:
              event.category === 'DATE'
                ? dayjs(
                    `${confirmedTime?.start_date} ${confirmedTime?.start_time}`,
                    'YYYY.MM.DD HH:mm',
                  ).toISOString()
                : dayjs(confirmedTime?.start_time, 'HH:mm')
                    .day(
                      weekdaysShortKo.findIndex(
                        (weekday) => weekday === confirmedTime?.start_day,
                      ),
                    )
                    .toISOString(),
            end_at:
              event.category === 'DATE'
                ? dayjs(
                    `${confirmedTime?.end_date} ${confirmedTime?.end_time}`,
                    'YYYY.MM.DD HH:mm',
                  ).toISOString()
                : dayjs(confirmedTime?.end_time, 'HH:mm')
                    .day(
                      weekdaysShortKo.findIndex(
                        (weekday) => weekday === confirmedTime?.end_day,
                      ),
                    )
                    .toISOString(),
            time_zone: dayjs.tz.guess(),
          },
          description: 'OneTime에 의해 추가된 일정입니다.',
          reminders: [30, 1440],
          color: 'LAVENDER',
          ...(event.category === 'DAY' ? { rrule: 'FREQ=WEEKLY' } : {}),
        }),
      }),
    },
  );

  if (!res.ok) {
    throw new Error('톡캘린더 이벤트 생성 도중 에러가 발생했습니다.');
  }
}
