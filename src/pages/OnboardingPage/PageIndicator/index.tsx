import PageIndicatorItem from './PageIndicatorItem';
import cn from '@/utils/cn';

interface PageIndicatorProps {
  page: number;
  pageMaxNumber: number;
  className?: string;
}

export default function PageIndicator({
  page,
  pageMaxNumber,
  className,
}: PageIndicatorProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 py-4 md:justify-center',
        className,
      )}
    >
      {Array.from({ length: pageMaxNumber }, (_, i) => i + 1).map(
        (pageNumber) => (
          <PageIndicatorItem
            key={pageNumber}
            page={page}
            pageNumber={pageNumber}
          />
        ),
      )}
    </div>
  );
}
