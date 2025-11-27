import { editUserNameAction } from './user.api';
import {
  myEventsQueryOptions,
  userPolicyQueryOptions,
  userQueryOptions,
} from './user.options';
import { editUserLanguageAction } from '@/lib/api/actions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useUserQuery({ enabled }: { enabled?: boolean } = {}) {
  const { data } = useQuery({ ...userQueryOptions, enabled });

  return { data };
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

export function useEditUserLanguageMutation() {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: editUserLanguageAction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return {
    editUserLanguage: mutateAsync,
  };
}
