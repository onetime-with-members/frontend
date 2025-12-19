import { useEffect, useRef } from 'react';

interface UseInfiniteScrollOptions {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  rootMargin?: string;
  threshold?: number;
}

export default function useInfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  rootMargin = '200px 0px',
  threshold = 0.1,
}: UseInfiniteScrollOptions) {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasNextPageRef = useRef(hasNextPage);
  const isFetchingNextPageRef = useRef(isFetchingNextPage);

  useEffect(() => {
    hasNextPageRef.current = hasNextPage;
    isFetchingNextPageRef.current = isFetchingNextPage;

    if (!hasNextPage && observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
      return;
    }

    if (!loadMoreRef.current || !hasNextPage) {
      return;
    }

    const target = loadMoreRef.current;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (
          entry.isIntersecting &&
          hasNextPageRef.current &&
          !isFetchingNextPageRef.current
        ) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      },
    );

    observerRef.current = observer;
    observer.observe(target);

    return () => {
      observer.unobserve(target);
      observer.disconnect();
      observerRef.current = null;
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, rootMargin, threshold]);

  return { loadMoreRef };
}
