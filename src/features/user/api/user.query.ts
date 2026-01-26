import { useContext } from 'react';

import {
  createUserAction,
  editUserLanguageAction,
  editUserNameAction,
  editUserPolicyAction,
  withdrawAction,
} from './user.api';
import {
  myEventListInfiniteQueryOptions,
  userPolicyQueryOptions,
  userQueryOptions,
} from './user.options';
import { defaultInfiniteData } from '@/constants';
import { SessionContext } from '@/features/auth/contexts/SessionContext';
import { useAuth } from '@/lib/auth';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export function useUserQuery() {
  const { isLoggedIn } = useContext(SessionContext);

  const { data } = useQuery({ ...userQueryOptions, enabled: isLoggedIn });

  return { data };
}

export function useRecentMyEventListQuery() {
  const { data: _data, isLoading } = useMyEventListInfiniteQuery();

  const data = _data.pages.length > 0 ? _data.pages[0].events.slice(0, 2) : [];

  return {
    data,
    isLoading,
  };
}

export function useMyEventListInfiniteQuery() {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      ...myEventListInfiniteQueryOptions,
    });

  return {
    data: data || defaultInfiniteData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  };
}

export function useUserPolicyQuery({ enabled }: { enabled: boolean }) {
  const { data, isPending } = useQuery({ ...userPolicyQueryOptions, enabled });

  return { data, isPending };
}

export function useCreateUserMutation() {
  const queryClient = useQueryClient();

  const { signIn } = useAuth();

  const { mutateAsync } = useMutation({
    mutationFn: createUserAction,
    onSuccess: async (data) => {
      await signIn({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      });
      await queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return {
    createUser: mutateAsync,
  };
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

export function useEditPolicyMutation() {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: editUserPolicyAction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return { mutateAsync };
}

export function useWithdrawMutation() {
  const { clearAuth } = useAuth();

  const { mutateAsync } = useMutation({
    mutationFn: withdrawAction,
    onSuccess: async () => {
      await clearAuth();
    },
  });

  return {
    withdraw: mutateAsync,
  };
}
