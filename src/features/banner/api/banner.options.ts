import { Banner } from '../types';
import { fetchBanner } from './banner.api';
import { queryOptions } from '@tanstack/react-query';

export const bannerQueryOptions = queryOptions<Banner[]>({
  queryKey: ['banner'],
  queryFn: fetchBanner,
});
