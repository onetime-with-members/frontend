import { MyEventType, UserType } from '../models';
import { fetchMyEvents, fetchUserProfile } from './user.api';
import { queryOptions } from '@tanstack/react-query';

export const userQueryOptions = queryOptions<UserType>({
  queryKey: ['users', 'profile'],
  queryFn: fetchUserProfile,
});

export const myEventsQueryOptions = queryOptions<MyEventType[]>({
  queryKey: ['events', 'user', 'all'],
  queryFn: fetchMyEvents,
});
