import { useEffect, useMemo, useRef, useState } from 'react';

import Banner from './Banner';
import { bannerQueryOptions } from '@/lib/api/query-options';
import cn from '@/lib/cn';
import { useQuery } from '@tanstack/react-query';

export default function BannerList({ className }: { className?: string }) {
  const { data: banners, isLoading } = useQuery({ ...bannerQueryOptions });
  const scrollRef = useRef<HTMLDivElement | null>(null);
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
    const scrollContainer = scrollRef.current;
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

  if (isLoading || total === 0) return null;

  return (
    <div className={cn('relative', className)}>
      <div
        ref={scrollRef}
        className="scrollbar-hidden flex w-full gap-3 overflow-x-scroll"
      >
        {loopedBanner.map((banner, idx) => (
          <Banner key={`${banner.id}-${idx}`} banner={banner} />
        ))}
      </div>
    </div>
  );
}
