import { Banner } from '../models';
import { fetchBanner } from './banner.api';
import { queryOptions } from '@tanstack/react-query';

export const bannerQueryOptions = queryOptions<Banner[]>({
  queryKey: ['banner'],
  queryFn: fetchBanner,
});
