import { MyEventsType, PolicySchema, UserType } from '../types';
import { fetchMyEvents, fetchUserPolicy, fetchUserProfile } from './user.api';
import { queryOptions } from '@tanstack/react-query';

export const userQueryOptions = queryOptions<UserType>({
  queryKey: ['users', 'profile'],
  queryFn: fetchUserProfile,
});

export const myEventsQueryOptions = (size: number, cursor: string) =>
  queryOptions<MyEventsType>({
    queryKey: ['events', 'user', 'all', size, cursor ?? null],
    queryFn: () => fetchMyEvents(size, cursor),
  });

export const userPolicyQueryOptions = queryOptions<PolicySchema>({
  queryKey: ['users', 'policy'],
  queryFn: fetchUserPolicy,
});
