import { MyEventListType, PolicySchema, UserType } from '../types';
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

// export const myEventsQueryOptions = (size: number, cursor: string) =>
//   queryOptions<MyEventListType>({
//     queryKey: ['events', 'user', 'all', size, cursor ?? null],
//     queryFn: () => fetchMyEventList(size, cursor),
//   });

export const myEventListInfiniteQueryOptions =
  infiniteQueryOptions<MyEventListType>({
    queryKey: ['events', 'user', 'infinite'],
    queryFn: ({ pageParam }) =>
      fetchMyEventList({ size: 4, cursor: pageParam as string }),
    initialPageParam: '',
    getNextPageParam: ({
      page_cursor_info: { has_next: hasNext, next_cursor: nextCursor },
    }) => (hasNext ? nextCursor : undefined),
  });

export const userPolicyQueryOptions = queryOptions<PolicySchema>({
  queryKey: ['users', 'policy'],
  queryFn: fetchUserPolicy,
});
