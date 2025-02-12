import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import EmptyUI from '@/components/EmptyUI/EmptyUI';
import MyEvent from '@/components/MyEvent/MyEvent';
import { RootState } from '@/store';
import cn from '@/utils/cn';
import { IconChevronRight } from '@tabler/icons-react';

export default function MyEventSection() {
  const { myEvents, status } = useSelector((state: RootState) => state.event);

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
      {status.myEvents === 'pending' && (
        <div className="rounded-2xl py-5">
          <EmptyUI>이벤트를 불러오는 중입니다.</EmptyUI>
        </div>
      )}
      {myEvents && (
        <>
          <ul className="grid grid-cols-1 lg:hidden">
            {myEvents.length === 0 && (
              <div className="rounded-2xl bg-gray-00 py-5">
                <EmptyUI>아직 참여한 이벤트가 없어요.</EmptyUI>
              </div>
            )}
            {myEvents.length >= 1 &&
              myEvents
                .slice(0, 1)
                .map((myEvents) => (
                  <MyEvent
                    key={myEvents.event_id}
                    event={myEvents}
                    className="border-none"
                  />
                ))}
          </ul>
          <ul
            className={cn('hidden grid-cols-2 gap-4 lg:grid', {
              'grid-cols-1': myEvents.length === 0,
            })}
          >
            {myEvents.length === 0 && (
              <div className="rounded-2xl bg-gray-00 py-5">
                <EmptyUI>아직 참여한 이벤트가 없어요.</EmptyUI>
              </div>
            )}
            {myEvents.length >= 1 &&
              myEvents
                .slice(0, 2)
                .map((event) => (
                  <MyEvent
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
