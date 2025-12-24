'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import MyEventListLayout from '../MyEventListLayout';
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
    <MyEventListLayout>
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
    </MyEventListLayout>
  );
}
