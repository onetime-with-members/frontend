import { useEffect, useMemo, useRef, useState } from 'react';

import Banner from './Banner';
import { bannerQueryOptions } from '@/lib/api/query-options';
import cn from '@/lib/cn';
import { useQuery } from '@tanstack/react-query';

export default function BannerList({ className }: { className?: string }) {
  const { data: banners, isLoading } = useQuery({ ...bannerQueryOptions });
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [bannerIndex, setBannerIndex] = useState(0);

  const total = useMemo(
    () => (Array.isArray(banners) ? banners.length : 0),
    [banners],
  );

  // bannerIndex가 바뀌면 해당 배너의 offsetLeft로 스크롤
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const target = scrollContainer.children[bannerIndex] as
      | HTMLElement
      | undefined;
    if (!target) return;

    scrollContainer.scrollTo({
      left: target.offsetLeft,
      behavior: 'smooth',
    });
  }, [bannerIndex]);

  // 3초마다 다음 인덱스로 (배너 1개면 동작 안 함)
  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(() => {
      setBannerIndex((p) => (p + 1) % total);
    }, 3000);
    return () => clearInterval(timer);
  }, [total]);

  if (isLoading || !banners || !Array.isArray(banners)) return null;

  return (
    <div className={cn('relative', className)}>
      <div
        ref={scrollContainerRef}
        className="scrollbar-hidden flex w-full gap-3 overflow-x-scroll"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {banners.map((banner) => (
          <Banner key={banner.id} banner={banner} />
        ))}
      </div>
    </div>
  );
}
