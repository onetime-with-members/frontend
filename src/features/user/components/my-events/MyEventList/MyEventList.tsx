'use client';

import GrayBackground from '@/components/GrayBackground';
import { useInfiniteMyEventsQuery } from '@/features/user/api/user.query';
import MyEvent from '@/features/user/components/shared/MyEvent';
import useInfiniteScroll from '@/features/user/hooks/useInfiniteScroll';

export default function MyEventList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteMyEventsQuery(4);

  const events = data?.pages.flatMap((page) => page.events) ?? [];

  const { loadMoreRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <div className="flex flex-col gap-5 px-4 py-5">
      {events.map((event) => (
        <MyEvent
          key={event.event_id}
          event={event}
          className="border-0 md:border"
        />
      ))}

      {hasNextPage && <div ref={loadMoreRef} className="h-8 w-full" />}

      <GrayBackground device="mobile" breakpoint="md" />
    </div>
  );
}
