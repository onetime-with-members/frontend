import cn from '@/lib/cn';

interface PageIndicatorItemProps {
  page: number;
  pageNumber: number;
}

export default function PageIndicatorItem({
  page,
  pageNumber,
}: PageIndicatorItemProps) {
  return (
    <div
      className={cn(
        'flex h-6 w-6 items-center justify-center rounded-full bg-gray-05 text-gray-20 text-sm-300',
        {
          'bg-primary-40 text-white': page === pageNumber,
        },
      )}
    >
      {pageNumber}
    </div>
  );
}
