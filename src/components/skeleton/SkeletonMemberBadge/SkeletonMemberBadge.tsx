import Skeleton, { SkeletonProps } from 'react-loading-skeleton';

type SkeletonMemberBadgeProps = SkeletonProps;

export default function SkeletonMemberBadge(props: SkeletonMemberBadgeProps) {
  return <Skeleton width={48} height={20} borderRadius={9999} {...props} />;
}
