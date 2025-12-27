'use client';

import { useMyEventListInfiniteQuery } from '../api/user.query';
import EmptyMyEvents from '../components/my-events/EmptyMyEvents';
import MyEventList from '../components/my-events/MyEventList';

export default function MyEventListPage() {
  const { data, isLoading } = useMyEventListInfiniteQuery();

  const flatEventList = data.pages.flatMap(({ events }) => events) ?? [];
  const isEmpty = !isLoading && flatEventList.length === 0;

  return isEmpty ? <EmptyMyEvents /> : <MyEventList />;
}
