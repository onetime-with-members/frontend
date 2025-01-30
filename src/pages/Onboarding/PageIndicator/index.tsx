import PageIndicatorItem from './PageIndicatorItem';

interface PageIndicatorProps {
  page: number;
  pageMaxNumber: number;
}

export default function PageIndicator({
  page,
  pageMaxNumber,
}: PageIndicatorProps) {
  return (
    <div className="flex items-center gap-2 py-4">
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
