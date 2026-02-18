'use client';

import { useEffect } from 'react';

import { useCreateTalkCalendarEvent, useEventQuery } from '../api/event.query';
import { TALK_CALENDAR_SUCCESS } from '../constants';
import {
  addTalkCalendarEventCookie,
  deleteTalkCalendarEventCookie,
} from '../lib/talk-calendar-event-cookie';
import { getKakaoAuthCode } from '@/features/auth/api/auth.api';
import { useKakaoAccessTokenQuery } from '@/features/auth/api/auth.query';
import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';

export default function EventTalkCalendarPage({
  eventId,
}: {
  eventId: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get('code');
  const eventIdParam = searchParams.get('event_id');

  const { data: event, isPending: isEventPending } = useEventQuery(eventId);
  const { data: kakaoAccessToken } = useKakaoAccessTokenQuery(
    code ?? '',
    '/events/talk-calendar',
    { enabled: !!code },
  );

  const {
    mutateAsync: createTalkCalendarEvent,
    isPending,
    isSuccess,
    isError,
  } = useCreateTalkCalendarEvent();

  useEffect(() => {
    (async () => {
      if (!code && eventIdParam) {
        await addTalkCalendarEventCookie(eventIdParam);
        getKakaoAuthCode('/events/talk-calendar');
      }
    })();
  }, [code, eventIdParam]);

  useEffect(() => {
    (async () => {
      if (
        !kakaoAccessToken ||
        isEventPending ||
        isPending ||
        isSuccess ||
        isError
      )
        return;
      await createTalkCalendarEvent({ accessToken: kakaoAccessToken, event });
      await deleteTalkCalendarEventCookie();
      router.push(`/events/view/${eventId}?toast=${TALK_CALENDAR_SUCCESS}`);
    })();
  }, [kakaoAccessToken, event, isEventPending, isPending, isSuccess, isError]);

  return null;
}
