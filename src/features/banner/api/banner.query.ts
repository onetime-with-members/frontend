import { clickBanner } from './banner.api';
import { bannerQueryOptions } from './banner.options';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useBannerQuery() {
  const { data } = useQuery({
    ...bannerQueryOptions,
  });

  return { data };
}

export function useClickBannerMutation() {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: clickBanner,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['banner'] });
    },
    onError: (error) => {
      console.error('배너 클릭 데이터 전송 중 에러가 발생했습니다.', error);
    },
  });

  return { mutateAsync };
}
