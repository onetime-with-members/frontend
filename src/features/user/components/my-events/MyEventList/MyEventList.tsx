'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import InfiniteScrollTrigger from './InfiniteScrollTrigger';
import MyEventListSkeleton from './MyEventListSkeleton';
import { useMyEventListInfiniteQuery } from '@/features/user/api/user.query';
import MyEvent from '@/features/user/components/shared/MyEvent';

export default function MyEventList() {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetching } =
    useMyEventListInfiniteQuery();

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col gap-5 px-4 py-5" data-testid="my-event-list">
      {data.pages.map(({ events }) =>
        events.map((event) => (
          <MyEvent
            key={event.event_id}
            event={event}
            className="border-0 md:border"
          />
        )),
      )}
      {isFetching && <MyEventListSkeleton />}
      <InfiniteScrollTrigger ref={ref} />
    </div>
  );
}
