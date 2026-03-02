'use client';

import { useContext, useEffect } from 'react';

import EventDetailRedirect from '../components/talk-calendar/EventDetailRedirect';
import KakaoRedirect from '../components/talk-calendar/KakaoRedirect';
import { FooterContext } from '@/features/set-up/contexts/FooterContext';
import { useSearchParams } from 'next/navigation';

export default function EventTalkCalendarPage({
  eventId,
}: {
  eventId: string;
}) {
  const { setFooterVisible } = useContext(FooterContext);

  const searchParams = useSearchParams();

  const code = searchParams.get('code');
  const eventIdParam = searchParams.get('event_id');

  useEffect(() => {
    setFooterVisible(false);
    return () => {
      setFooterVisible(true);
    };
  }, [setFooterVisible]);

  if (!code && eventIdParam) {
    return <KakaoRedirect />;
  }

  return <EventDetailRedirect eventId={eventId} />;
}
