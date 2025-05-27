'use client';

import EmptyMyEvent from './EmptyMyEvent/EmptyMyEvent';
import MyEvent from '@/components/event/my-event';
import useGrayBackground from '@/hooks/useGrayBackground';
import axios from '@/lib/axios';
import { breakpoint } from '@/lib/constants';
import { MyEventType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

export default function MyEventsPage() {
  const { isPending: isEventsPending, data: events } = useQuery<MyEventType[]>({
    queryKey: ['events', 'user', 'all'],
    queryFn: async () => {
      const res = await axios.get('/events/user/all');
      return res.data.payload;
    },
  });

  useGrayBackground({
    breakpointCondition: () => window.innerWidth < breakpoint.md,
  });

  if (isEventsPending || !events) {
    return <></>;
  }

  return events.length === 0 ? (
    <EmptyMyEvent />
  ) : (
    <ul className="flex flex-col gap-5 px-4 py-5">
      {events.map((event) => (
        <MyEvent
          key={event.event_id}
          event={event}
          innerClassName="border-0 md:border"
        />
      ))}
    </ul>
  );
}
