import { UserType } from '../models';
import { editUserNameAction } from './user.api';
import {
  myEventsQueryOptions,
  userPolicyQueryOptions,
  userQueryOptions,
} from './user.options';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useUserQuery({ enabled }: { enabled?: boolean } = {}) {
  const { data } = useQuery({ ...userQueryOptions, enabled });

  return { data: data || new UserType() };
}

export function useMyEventsQuery() {
  const { data, isPending } = useQuery({ ...myEventsQueryOptions });

  return { data, isPending };
}

export function useUserPolicyQuery({ enabled }: { enabled: boolean }) {
  const { data, isPending } = useQuery({ ...userPolicyQueryOptions, enabled });

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
