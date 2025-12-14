import cn from '@/lib/cn';

export default function PageIndicator({ pageIndex }: { pageIndex: number }) {
  return (
    <div
      className={cn('flex items-center gap-2 py-4 md:justify-center', {
        hidden: pageIndex === 3,
      })}
    >
      {Array.from({ length: 3 }, (_, i) => i + 1).map((pageNumber, index) => (
        <div
          key={index}
          className={cn(
            'flex h-6 w-6 items-center justify-center rounded-full bg-gray-05 text-gray-20 text-sm-300',
            {
              'bg-primary-40 text-white': pageIndex === index,
            },
          )}
        >
          {pageNumber}
        </div>
      ))}
    </div>
  );
}
