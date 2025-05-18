import Skeleton from 'react-loading-skeleton';

export default function SkeletonToolbarTitle() {
  return (
    <Skeleton
      width={200}
      baseColor="#404251"
      highlightColor="#585a70"
      borderRadius={9999}
    />
  );
}
