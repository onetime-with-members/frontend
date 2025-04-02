import { getCookie } from 'cookies-next';
import { useEffect } from 'react';

import useBarBannerStore from '@/stores/bar-banner';
import { Banner } from '@/types/banner.type';
import axios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

export default function useBarBannerInit() {
  const { showBarBanner, hideBarBanner, setBarBanner } = useBarBannerStore(
    (state) => state.actions,
  );

  const isBarBannerHidden = getCookie('bar-banner');

  const { data } = useQuery<Banner>({
    queryKey: ['banners', 'activated'],
    queryFn: async () => {
      const res = await axios.get('/banners/activated');
      return res.data.payload;
    },
    retry: false,
    enabled: !isBarBannerHidden,
  });

  useEffect(() => {
    if (data) {
      setBarBanner(data);
      showBarBanner();
    } else {
      hideBarBanner();
    }
  }, [data, setBarBanner, showBarBanner, hideBarBanner]);
}
