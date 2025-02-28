import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import Header from '../Header/Header';
import EmptyUI from '@/components/EmptyUI/EmptyUI';
import MyEvent from '@/components/MyEvent/MyEvent';
import { MyEventType } from '@/types/event.type';
import axios from '@/utils/axios';
import breakpoint from '@/utils/breakpoint';
import cn from '@/utils/cn';
import { useQuery } from '@tanstack/react-query';

export default function MyEventSection() {
  const [clientWidth, setClientWidth] = useState(window.innerWidth);

  const { t } = useTranslation();

  const { isPending: isEventsPending, data: events } = useQuery<MyEventType[]>({
    queryKey: ['events', 'user', 'all'],
    queryFn: async () => {
      const res = await axios.get('/events/user/all');
      return res.data.payload;
    },
  });

  const eventsLength = clientWidth >= breakpoint.md ? 2 : 1;

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
      <Header moreHref="/mypage/events">
        <Trans
          i18nKey="userDashboard.recentEvents"
          count={
            events === undefined
              ? eventsLength
              : events?.length <= 1
                ? events?.length
                : eventsLength
          }
        >
          참여한 이벤트
        </Trans>
      </Header>
      {isEventsPending && (
        <div className="rounded-2xl py-5">
          <EmptyUI>{t('userDashboard.loadingEvents')}</EmptyUI>
        </div>
      )}
      {!isEventsPending && events && (
        <ul
          className={cn('grid grid-cols-1 gap-4 md:grid-cols-2', {
            'md:grid-cols-1': events.length === 0,
          })}
        >
          {events.length === 0 && (
            <div className="rounded-2xl bg-gray-00 py-5">
              <EmptyUI>{t('userDashboard.noEvent')}</EmptyUI>
            </div>
          )}
          {events.length >= 1 &&
            events
              .slice(0, eventsLength)
              .map((event) => (
                <MyEvent
                  key={event.event_id}
                  event={event}
                  innerClassName="border-none"
                />
              ))}
        </ul>
      )}
    </section>
  );
}
