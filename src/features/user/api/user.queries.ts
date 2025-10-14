import { myEventsQueryOptions, userQueryOptions } from './user.options';
import { useQuery } from '@tanstack/react-query';

export function useUserQuery({ enabled }: { enabled?: boolean } = {}) {
  const { data } = useQuery({ ...userQueryOptions, enabled });

  return { data };
}

export function useMyEventsQuery() {
  const { data, isPending } = useQuery({ ...myEventsQueryOptions });

  return { data, isPending };
}
