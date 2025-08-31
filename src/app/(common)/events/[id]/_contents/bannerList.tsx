import { useEffect, useMemo, useRef, useState } from 'react';

import Banner from './banner';
import { bannerQueryOptions } from '@/lib/api/query-options';
import { useQuery } from '@tanstack/react-query';

export default function BannerList({
  ishidden = false,
}: {
  ishidden?: boolean;
}) {
  const { data: banners, isLoading } = useQuery(bannerQueryOptions);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [idx, setIdx] = useState(0);
  const total = useMemo(
    () => (Array.isArray(banners) ? banners.length : 0),
    [banners],
  );

  // idx가 바뀌면 해당 배너의 offsetLeft로 스크롤
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const target = el.children[idx] as HTMLElement | undefined;
    if (!target) return;

    el.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
  }, [idx]);

  // 10초마다 다음 인덱스로 (배너 1개면 동작 안 함)
  useEffect(() => {
    if (total <= 1) return;
    const t = setInterval(() => {
      setIdx((p) => (p + 1) % total);
    }, 10000);
    return () => clearInterval(t);
  }, [total]);

  if (isLoading || !banners || !Array.isArray(banners)) return null;

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="scrollbar-hidden flex w-full gap-3 overflow-x-scroll"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {banners.map((banner) => (
          <Banner
            key={banner.id}
            banner={banner}
            ishidden={ishidden}
            currentIndex={idx}
            totalCount={total}
          />
        ))}
      </div>
    </div>
  );
}
