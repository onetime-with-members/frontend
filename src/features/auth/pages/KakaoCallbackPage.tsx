'use client';

import { deleteCookie, getCookie } from 'cookies-next';
import { useEffect } from 'react';

import { TALK_CALENDAR_EVENT_ID } from '@/features/event/constants';
import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';

export default function KakaoCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get('code');

  useEffect(() => {
    (async () => {
      if (!code) {
        router.replace('/');
        return;
      }
      const eventId = getCookie(TALK_CALENDAR_EVENT_ID) as string;
      await deleteCookie(TALK_CALENDAR_EVENT_ID);
      router.replace({
        pathname: '/events/talk-calendar',
        query: { code, event_id: eventId },
      });
    })();
  }, [code]);

  return null;
}
