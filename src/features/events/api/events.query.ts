import { createEventAction, editEventAction } from './events.api';
import { eventQueryOptions, eventWithAuthQueryOptions } from './events.option';
import { defaultEvent } from '@/lib/constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useEventQuery(id: string) {
  const { data } = useQuery({ ...eventQueryOptions(id) });

  return { data: data || defaultEvent };
}

export function useEventWithAuthQuery({
  id,
  enabled,
}: {
  id: string;
  enabled?: boolean;
}) {
  const { data } = useQuery({
    ...eventWithAuthQueryOptions(id),
    enabled,
  });

  return { data };
}

export function useCreateEventMutation() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createEventAction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  return { mutateAsync, isPending };
}

export function useEditEventMutation() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: editEventAction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  return { mutateAsync, isPending };
}
