import { Link } from 'react-router-dom';

import EmptyUI from '../../../components/EmptyUI';
import MyEventItem from '../../../components/list/my-event/MyEventItem';
import { MyEvent } from '../../../types/event.type';
import axios from '../../../utils/axios';
import { IconChevronRight } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';

export default function MyEventSection() {
  const { isPending: isEventsPending, data: events } = useQuery<MyEvent[]>({
    queryKey: ['events', 'user', 'all'],
    queryFn: async () => {
      const res = await axios.get('/events/user/all');
      return res.data.payload;
    },
  });

  return (
    <section className="flex flex-col gap-3">
      <header className="flex items-center justify-between">
        <h2 className="text-gray-90 title-sm-300">참여한 이벤트</h2>
        <Link to="/mypage/events" className="flex items-center text-gray-50">
          <span>더 보기</span>
          <span>
            <IconChevronRight />
          </span>
        </Link>
      </header>
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
                  <MyEventItem
                    key={event.event_id}
                    event={event}
                    className="border-none"
                  />
                ))}
          </ul>
          <ul className="hidden grid-cols-2 gap-4 lg:grid">
            {events.length === 0 && (
              <div className="rounded-2xl bg-gray-00 py-5">
                <EmptyUI>아직 참여한 이벤트가 없어요.</EmptyUI>
              </div>
            )}
            {events.length >= 1 &&
              events
                .slice(0, 2)
                .map((event) => (
                  <MyEventItem
                    key={event.event_id}
                    event={event}
                    className="border-none"
                  />
                ))}
          </ul>
        </>
      )}
    </section>
  );
}
