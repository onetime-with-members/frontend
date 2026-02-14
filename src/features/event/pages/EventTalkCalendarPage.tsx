'use client';

import { useEffect, useRef } from 'react';

import { useCreateTalkCalendarEvent, useEventQuery } from '../api/event.query';
import { TALK_CALENDAR_SUCCESS } from '../constants';
import { addTalkCalendarEventCookie } from '../lib/talk-calendar-event-cookie';
import { getKakaoAuthCode } from '@/features/auth/api/auth.api';
import { useKakaoAccessTokenQuery } from '@/features/auth/api/auth.query';
import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';

export default function EventTalkCalendarPage({
  eventId,
}: {
  eventId: string;
}) {
  const isCompleted = useRef(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get('code');
  const eventIdParam = searchParams.get('event_id');

  const { data: event, isPending } = useEventQuery(eventId);
  const { data: kakaoAccessToken } = useKakaoAccessTokenQuery(
    code ?? '',
    '/events/talk-calendar',
    { enabled: !!code },
  );

  const { mutateAsync: createTalkCalendarEvent } = useCreateTalkCalendarEvent();

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
      if (!kakaoAccessToken || isPending || isCompleted.current) return;
      await createTalkCalendarEvent({ accessToken: kakaoAccessToken, event });
      isCompleted.current = true;
      router.push(`/events/view/${eventId}?toast=${TALK_CALENDAR_SUCCESS}`);
    })();
  }, [kakaoAccessToken, event, isPending]);

  return null;
}
