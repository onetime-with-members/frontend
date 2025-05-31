'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import Header from './header';
import MyEvent from '@/components/event/my-event';
import useClientWidth from '@/hooks/useClientWidth';
import { breakpoint } from '@/lib/constants';
import { MyEventType } from '@/lib/types';

export function MyEventsHeader({ myEvents }: { myEvents: MyEventType[] }) {
  const [myEventsLength, setMyEventsLength] = useState(2);

  const clientWidth = useClientWidth();

  const t = useTranslations('userDashboard');

  useEffect(() => {
    setMyEventsLength(clientWidth >= breakpoint.md ? 2 : 1);
  }, [clientWidth]);

  return (
    <Header moreHref="/mypage/events">
      {t('recentEvents', {
        count:
          myEvents === undefined
            ? myEventsLength
            : myEvents.length <= 1
              ? myEvents.length
              : myEventsLength,
      })}
    </Header>
  );
}

export function MyEventsList({ myEvents }: { myEvents: MyEventType[] }) {
  const [eventsLength, setEventsLength] = useState(2);

  const clientWidth = useClientWidth();

  useEffect(() => {
    setEventsLength(clientWidth >= breakpoint.md ? 2 : 1);
  }, [clientWidth]);

  return myEvents
    .slice(0, eventsLength)
    .map((myEvent) => (
      <MyEvent key={myEvent.event_id} event={myEvent} className="border-none" />
    ));
}
