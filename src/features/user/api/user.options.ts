import { MyEventType, UserType } from '../models';
import { fetchMyEvents, fetchUserPolicy, fetchUserProfile } from './user.api';
import { PolicyFormType } from '@/lib/validation/form-types';
import { queryOptions } from '@tanstack/react-query';

export const userQueryOptions = queryOptions<UserType>({
  queryKey: ['users', 'profile'],
  queryFn: fetchUserProfile,
});

export const myEventsQueryOptions = queryOptions<MyEventType[]>({
  queryKey: ['events', 'user', 'all'],
  queryFn: fetchMyEvents,
});

export const userPolicyQueryOptions = queryOptions<PolicyFormType>({
  queryKey: ['users', 'policy'],
  queryFn: fetchUserPolicy,
});
