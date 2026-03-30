'use client';

import { useEffect } from 'react';

import { TALK_CALENDAR_EVENT_ID } from '@/features/event/constants';
import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';

export default function KakaoCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get('code');

  useEffect(() => {
    if (!code) {
      router.replace('/');
      return;
    }

    const eventId = sessionStorage.getItem(TALK_CALENDAR_EVENT_ID);
    sessionStorage.removeItem(TALK_CALENDAR_EVENT_ID);
    router.replace({
      pathname: '/events/talk-calendar',
      query: { code, event_id: eventId },
    });
  }, [code]);

  return null;
}
