import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import TimeBlockBoardSkeleton from './TimeBlockBoardSkeleton';
import { SKELETON_DARK_GRAY, SKELETON_GRAY } from '@/constants';

export default function MyScheduleSkeleton() {
  return (
    <SkeletonTheme baseColor={SKELETON_DARK_GRAY} borderRadius={9999}>
      <div
        className="rounded-2xl"
        style={{
          backgroundColor: SKELETON_GRAY,
        }}
      >
        <div className="flex items-center justify-between px-5 pb-3 pt-4">
          <Skeleton width={200} height={24} />
          <Skeleton width={24} height={24} circle />
        </div>

        <div className="flex items-center justify-between px-5 pb-3 pt-4">
          <Skeleton width={150} height={32} />
          <Skeleton width={32} height={32} circle />
        </div>

        <TimeBlockBoardSkeleton
          baseColor={SKELETON_DARK_GRAY}
          className="pb-10 pl-4 pr-5 pt-4"
        />
      </div>
    </SkeletonTheme>
  );
}
