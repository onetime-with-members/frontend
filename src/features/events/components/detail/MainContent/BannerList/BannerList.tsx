import Banner from './Banner';
import useBannerList from '@/features/events/hooks/useBannerList';
import cn from '@/lib/cn';

export default function BannerList({ className }: { className?: string }) {
  const { scrollContainerRef, isShown, loopedBanner } = useBannerList();

  return (
    isShown && (
      <div className={cn('relative', className)}>
        <div
          ref={scrollContainerRef}
          className="scrollbar-hidden flex w-full gap-3 overflow-x-scroll"
        >
          {loopedBanner.map((banner, idx) => (
            <Banner key={`${banner.id}-${idx}`} banner={banner} />
          ))}
        </div>
      </div>
    )
  );
}
