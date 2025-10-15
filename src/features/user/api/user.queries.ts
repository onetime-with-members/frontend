import { editUserNameAction } from './user.api';
import { myEventsQueryOptions, userQueryOptions } from './user.options';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useUserQuery({ enabled }: { enabled?: boolean } = {}) {
  const { data } = useQuery({ ...userQueryOptions, enabled });

  return { data };
}

export function useMyEventsQuery() {
  const { data, isPending } = useQuery({ ...myEventsQueryOptions });

  return { data, isPending };
}

export function useEditProfileMutation() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: string) => editUserNameAction(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return {
    editUserName: mutateAsync,
    isPending,
  };
}
