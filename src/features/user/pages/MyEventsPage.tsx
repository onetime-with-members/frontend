'use client';

import { useInfiniteMyEventsQuery } from '../api/user.query';
import EmptyMyEvent from '../components/my-events/EmptyMyEvents';
import MyEventList from '../components/my-events/MyEventList';

export default function MyEventsPage() {
  const { data } = useInfiniteMyEventsQuery(4);

  const events = data?.pages.flatMap((page) => page.events) ?? [];

  if (!data) {
    return <MyEventList />;
  }

  return events.length === 0 ? <EmptyMyEvent /> : <MyEventList />;
}
