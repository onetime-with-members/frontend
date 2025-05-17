import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function SkeletonContent() {
  return (
    <SkeletonTheme baseColor="#DADBE2" borderRadius={9999}>
      <div className="rounded-2xl bg-gray-10">
        <div className="flex items-center justify-between px-5 pb-3 pt-4">
          <Skeleton width={200} height={24} />
          <Skeleton width={24} height={24} circle />
        </div>

        <div className="flex items-center justify-between px-5 pb-3 pt-4">
          <Skeleton width={150} height={32} />
          <Skeleton width={32} height={32} circle />
        </div>

        <div className="flex gap-2 pb-10 pl-4 pr-5 pt-4">
          <div className="flex flex-col items-center gap-10 pt-9">
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} width={20} height={16} />
            ))}
          </div>
          <div className="grid flex-1 grid-cols-7 gap-2">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <Skeleton width={50} height={24} />
                <Skeleton
                  height={500}
                  borderRadius={8}
                  containerClassName="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}
