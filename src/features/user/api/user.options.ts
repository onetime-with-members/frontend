import { MY_EVENT_LIST_PAGINATION_SIZE } from '../constants';
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

export const myEventListInfiniteQueryOptions =
  infiniteQueryOptions<MyEventListType>({
    queryKey: ['events', 'user', 'all'],
    queryFn: ({ pageParam: cursor }) =>
      fetchMyEventList({
        size: MY_EVENT_LIST_PAGINATION_SIZE,
        cursor: cursor as string,
      }),
    initialPageParam: '',
    getNextPageParam: ({
      page_cursor_info: { has_next: hasNext, next_cursor: nextCursor },
    }) => (hasNext ? nextCursor : undefined),
  });

export const userPolicyQueryOptions = queryOptions<PolicySchema>({
  queryKey: ['users', 'policy'],
  queryFn: fetchUserPolicy,
});
