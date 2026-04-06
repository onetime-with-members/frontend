import { setCookie } from 'cookies-next';
import { useEffect } from 'react';

import { getKakaoAuthCode } from '@/features/auth/api/auth.api';
import { TALK_CALENDAR_EVENT_ID } from '@/features/event/constants';
import { useSearchParams } from 'next/navigation';

export default function KakaoRedirect() {
  const searchParams = useSearchParams();

  const eventIdParam = searchParams.get('event_id');

  useEffect(() => {
    if (!eventIdParam) return;
    setCookie(TALK_CALENDAR_EVENT_ID, eventIdParam);
    getKakaoAuthCode();
  }, [eventIdParam]);

  return null;
}
