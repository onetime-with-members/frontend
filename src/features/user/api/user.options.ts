import { MyEventType, PolicySchema, UserType } from '../types';
import { fetchMyEvents, fetchUserPolicy, fetchUserProfile } from './user.api';
import { queryOptions } from '@tanstack/react-query';

export const userQueryOptions = queryOptions<UserType>({
  queryKey: ['users', 'profile'],
  queryFn: fetchUserProfile,
});

export const myEventsQueryOptions = queryOptions<MyEventType[]>({
  queryKey: ['events', 'user', 'all'],
  queryFn: fetchMyEvents,
});

export const userPolicyQueryOptions = queryOptions<PolicySchema>({
  queryKey: ['users', 'policy'],
  queryFn: fetchUserPolicy,
});
