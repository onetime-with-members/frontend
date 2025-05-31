import { useEffect, useState } from 'react';

export default function useTargetSticky({
  topRef,
  scrollableElementRef,
  targetHeight,
  targetTopOffset = 0,
  targetBottomOffset = 0,
}: {
  topRef: React.RefObject<HTMLElement | null>;
  scrollableElementRef: React.RefObject<HTMLElement | null>;
  targetHeight: number;
  targetTopOffset?: number;
  targetBottomOffset?: number;
}) {
  const [isTargetOnBottom, setIsTargetOnBottom] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (!topRef.current || !scrollableElementRef.current) return;

      const distanceFromTopToTarget =
        targetHeight + targetTopOffset + targetBottomOffset;

      const scrollableElementViewportHeight =
        scrollableElementRef.current?.getBoundingClientRect().bottom -
        topRef.current?.getBoundingClientRect().bottom;

      setIsTargetOnBottom(
        Math.min(distanceFromTopToTarget, scrollableElementViewportHeight) <
          distanceFromTopToTarget,
      );
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [
    scrollableElementRef,
    topRef,
    targetHeight,
    targetTopOffset,
    targetBottomOffset,
  ]);

  return {
    isTargetOnBottom,
  };
}
