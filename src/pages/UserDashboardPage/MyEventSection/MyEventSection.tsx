import { useTranslation } from 'react-i18next';

import Header from '../Header/Header';
import EmptyUI from '@/components/EmptyUI/EmptyUI';
import MyEvent from '@/components/MyEvent/MyEvent';
import { MyEventType } from '@/types/event.type';
import axios from '@/utils/axios';
import cn from '@/utils/cn';
import { useQuery } from '@tanstack/react-query';

export default function MyEventSection() {
  const { t } = useTranslation();

  const { isPending: isEventsPending, data: events } = useQuery<MyEventType[]>({
    queryKey: ['events', 'user', 'all'],
    queryFn: async () => {
      const res = await axios.get('/events/user/all');
      return res.data.payload;
    },
  });

  return (
    <section className="flex flex-col gap-3">
      <Header moreHref="/mypage/events">{t('common.joinedEvents')}</Header>
      {isEventsPending && (
        <div className="rounded-2xl py-5">
          <EmptyUI>이벤트를 불러오는 중입니다.</EmptyUI>
        </div>
      )}
      {!isEventsPending && events && (
        <>
          <ul className="grid grid-cols-1 lg:hidden">
            {events.length === 0 && (
              <div className="rounded-2xl bg-gray-00 py-5">
                <EmptyUI>아직 참여한 이벤트가 없어요.</EmptyUI>
              </div>
            )}
            {events.length >= 1 &&
              events
                .slice(0, 1)
                .map((event) => (
                  <MyEvent
                    key={event.event_id}
                    event={event}
                    innerClassName="border-none"
                  />
                ))}
          </ul>
          <ul
            className={cn('hidden grid-cols-2 gap-4 lg:grid', {
              'grid-cols-1': events.length === 0,
            })}
          >
            {events.length === 0 && (
              <div className="rounded-2xl bg-gray-00 py-5">
                <EmptyUI>아직 참여한 이벤트가 없어요.</EmptyUI>
              </div>
            )}
            {events.length >= 1 &&
              events
                .slice(0, 2)
                .map((event) => (
                  <MyEvent
                    key={event.event_id}
                    event={event}
                    innerClassName="border-none"
                  />
                ))}
          </ul>
        </>
      )}
    </section>
  );
}
