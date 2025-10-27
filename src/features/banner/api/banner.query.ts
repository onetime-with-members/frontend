import { bannerQueryOptions } from './banner.options';
import { useQuery } from '@tanstack/react-query';

export function useBannerQuery() {
  const { data } = useQuery({
    ...bannerQueryOptions,
  });

  return { data };
}
