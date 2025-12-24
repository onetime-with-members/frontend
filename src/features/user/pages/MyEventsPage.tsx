'use client';

import { useMyEventListInfiniteQuery } from '../api/user.query';
import EmptyMyEvents from '../components/my-events/EmptyMyEvents';
import MyEventList from '../components/my-events/MyEventList';
import GrayBackground from '@/components/GrayBackground';

export default function MyEventsPage() {
  const { data, isLoading } = useMyEventListInfiniteQuery();

  const flatEventList = data.pages.flatMap(({ events }) => events) ?? [];
  const isEmpty = !isLoading && flatEventList.length === 0;

  let content;

  if (isEmpty) {
    content = <EmptyMyEvents />;
  } else {
    content = <MyEventList />;
  }

  return (
    <>
      <GrayBackground device="mobile" breakpoint="md" />
      {content}
    </>
  );
}
