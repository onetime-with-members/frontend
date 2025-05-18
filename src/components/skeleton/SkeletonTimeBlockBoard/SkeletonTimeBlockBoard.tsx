import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { SKELETON_GRAY } from '@/lib/constants';
import cn from '@/utils/cn';

interface SkeletonTimeBlockBoardProps {
  className?: string;
  count?: number;
  baseColor?: string;
}

export default function SkeletonTimeBlockBoard({
  className,
  count = 7,
  baseColor = SKELETON_GRAY,
}: SkeletonTimeBlockBoardProps) {
  return (
    <SkeletonTheme baseColor={baseColor} borderRadius={9999}>
      <div className={cn('flex gap-2', className)}>
        <div className="flex flex-col items-center gap-10 pt-9">
          {Array.from({ length: 20 }).map((_, index) => (
            <Skeleton key={index} width={20} height={16} />
          ))}
        </div>

        <div
          className={cn('grid flex-1 grid-cols-7 gap-2')}
          style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <Skeleton width={40} height={24} />
              <Skeleton
                height={1000}
                borderRadius={8}
                containerClassName="w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </SkeletonTheme>
  );
}
