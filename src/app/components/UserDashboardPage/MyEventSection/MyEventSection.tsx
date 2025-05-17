import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import Header from '../Header/Header';
import EmptyUI from '@/components/EmptyUI/EmptyUI';
import MyEvent from '@/components/MyEvent/MyEvent';
import { breakpoint, defaultMyEvent } from '@/lib/constants';
import { MyEventType } from '@/types/event.type';
import axios from '@/utils/axios';
import cn from '@/utils/cn';
import { useQuery } from '@tanstack/react-query';

export default function MyEventSection() {
  const [clientWidth, setClientWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  );
  const [eventsLength, setEventsLength] = useState(2);

  const t = useTranslations('userDashboard');

  const { isPending: isEventsPending, data: events } = useQuery<MyEventType[]>({
    queryKey: ['events', 'user', 'all'],
    queryFn: async () => {
      const res = await axios.get('/events/user/all');
      return res.data.payload;
    },
  });

  useEffect(() => {
    setEventsLength(clientWidth >= breakpoint.md ? 2 : 1);
  }, [clientWidth]);

  useEffect(() => {
    function handleResize() {
      setClientWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="flex flex-col gap-3">
      <Header moreHref="/mypage/events" isPending={isEventsPending}>
        {t('recentEvents', {
          count:
            events === undefined
              ? eventsLength
              : events.length <= 1
                ? events.length
                : eventsLength,
        })}
      </Header>
      <ul
        className={cn('grid grid-cols-1 gap-4 md:grid-cols-2', {
          'md:grid-cols-1': events?.length === 0,
        })}
      >
        {isEventsPending &&
          Array.from({ length: 2 }).map((_, index) => (
            <MyEvent
              key={index}
              event={defaultMyEvent}
              innerClassName="border-none"
              className={cn({ 'hidden md:block': index === 1 })}
              isPending={true}
            />
          ))}
        {!isEventsPending &&
          events &&
          (events.length === 0 ? (
            <div className="rounded-2xl bg-gray-00 py-5">
              <EmptyUI>{t('noEvent')}</EmptyUI>
            </div>
          ) : (
            events
              .slice(0, eventsLength)
              .map((event) => (
                <MyEvent
                  key={event.event_id}
                  event={event}
                  innerClassName="border-none"
                />
              ))
          ))}
      </ul>
    </section>
  );
}
