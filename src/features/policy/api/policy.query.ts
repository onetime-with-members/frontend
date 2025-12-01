import { editUserPolicyAction } from './policy.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useEditPolicyMutation() {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: editUserPolicyAction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      // router.back();
    },
  });

  return { mutateAsync };
}
