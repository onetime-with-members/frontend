import { useEffect, useMemo, useRef, useState } from 'react';

import { useBannerQuery } from '@/features/banner/api/banner.query';

export default function useBannerList() {
  const { data: banners, isLoading } = useBannerQuery();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [bannerIndex, setBannerIndex] = useState(0);

  const total = useMemo(
    () => (Array.isArray(banners) ? banners.length : 0),
    [banners],
  );

  const loopedBanner = useMemo(() => {
    if (!banners || total === 0) return [];
    return [banners[total - 1], ...banners, banners[0]];
  }, [banners, total]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const target = scrollContainer.children[bannerIndex] as
      | HTMLElement
      | undefined;
    if (!target) return;

    scrollContainer.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });

    const reset = () => {
      const newbannerIndex = bannerIndex === 0 ? total : 1;
      setBannerIndex(newbannerIndex);
      const resetTarget = scrollContainer.children[
        newbannerIndex
      ] as HTMLElement;
      if (resetTarget) {
        scrollContainer.scrollTo({
          left: resetTarget.offsetLeft,
          behavior: 'auto',
        });
      }
    };

    if (bannerIndex === 0 || bannerIndex === loopedBanner.length - 1) {
      setTimeout(reset, 500);
    }
  }, [bannerIndex, loopedBanner, total]);

  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(() => setBannerIndex((i) => i + 1), 3000);
    return () => clearInterval(timer);
  }, [total]);

  const isShown = !isLoading && total !== 0;

  return { scrollContainerRef, isShown, loopedBanner };
}
