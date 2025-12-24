import { useContext } from 'react';

import { MyEventListType } from '../types';
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

// export function useMyEventsQuery(size: number, cursor: string = '') {
//   const { data, isPending } = useMyEventListInfiniteQuery(size, cursor);

//   const events = data?.pages.flatMap((page) => page.events) ?? [];
//   const pageCursorInfo = data
//     ? data.pages[data.pages.length - 1].page_cursor_info
//     : undefined;

//   return { data, events, pageCursorInfo, isPending };
// }

export function useMyEventListInfiniteQuery() {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery<MyEventListType>({
      ...myEventListInfiniteQueryOptions,
    });

  return { data, fetchNextPage, hasNextPage, isFetching, isLoading };
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
  const { withdraw: afterWithdraw } = useAuth();

  const { mutateAsync } = useMutation({
    mutationFn: withdrawAction,
    onSuccess: async () => {
      await afterWithdraw();
    },
  });

  return {
    withdraw: mutateAsync,
  };
}
