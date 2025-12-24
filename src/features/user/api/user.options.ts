import { MyEventListType, MyEventType, PolicySchema, UserType } from '../types';
import {
  fetchMyEventList,
  fetchUserPolicy,
  fetchUserProfile,
} from './user.api';
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

export const userQueryOptions = queryOptions<UserType>({
  queryKey: ['users', 'profile'],
  queryFn: fetchUserProfile,
});

export const recentMyEventListQueryOptions = queryOptions<MyEventType[]>({
  queryKey: ['events', 'user', 'all', 'recent'],
  queryFn: async () => {
    const { events } = await fetchMyEventList({ size: 2 });
    return events;
  },
});

export const myEventListInfiniteQueryOptions =
  infiniteQueryOptions<MyEventListType>({
    queryKey: ['events', 'user', 'all', 'infinite'],
    queryFn: ({ pageParam: cursor }) =>
      fetchMyEventList({ size: 4, cursor: cursor as string }),
    initialPageParam: '',
    getNextPageParam: ({
      page_cursor_info: { has_next: hasNext, next_cursor: nextCursor },
    }) => (hasNext ? nextCursor : undefined),
  });

export const userPolicyQueryOptions = queryOptions<PolicySchema>({
  queryKey: ['users', 'policy'],
  queryFn: fetchUserPolicy,
});
