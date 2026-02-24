import { useEffect, useState } from 'react';

import throttle from 'lodash/throttle';

export default function useScrollArrowButton({
  ref,
  scrollSyncRef,
}: {
  ref: React.RefObject<HTMLElement | null> | null;
  scrollSyncRef?: React.RefObject<HTMLElement | null> | null;
}) {
  const [arrowButtonVisible, setArrowButtonVisible] = useState({
    left: false,
    right: true,
  });

  function handleScrollLeft() {
    ref?.current?.scrollBy({
      left: -ref.current.clientWidth,
      behavior: 'smooth',
    });
    scrollSyncRef?.current?.scrollBy({
      left: -scrollSyncRef.current.clientWidth,
      behavior: 'smooth',
    });
  }

  function handleScrollRight() {
    ref?.current?.scrollBy({
      left: ref.current.clientWidth,
      behavior: 'smooth',
    });
    scrollSyncRef?.current?.scrollBy({
      left: scrollSyncRef.current.clientWidth,
      behavior: 'smooth',
    });
  }

  useEffect(() => {
    const scrollableElement = ref?.current;

    if (!scrollableElement) return;

    function updateArrowVisibility() {
      if (!scrollableElement) return;

      const { scrollWidth, clientWidth, scrollLeft } = scrollableElement;
      const isScrollable = scrollWidth > clientWidth;

      if (!isScrollable) {
        setArrowButtonVisible({ left: false, right: false });
        return;
      }

      setArrowButtonVisible({
        left: scrollLeft > 0,
        right: Math.ceil(scrollLeft) < scrollWidth - clientWidth,
      });
    }

    const throttledUpdate = throttle(updateArrowVisibility, 100);

    scrollableElement.addEventListener('scroll', throttledUpdate);

    function handleResize() {
      updateArrowVisibility();
    }

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(scrollableElement);

    updateArrowVisibility();

    return () => {
      scrollableElement.removeEventListener('scroll', throttledUpdate);
      resizeObserver.disconnect();
      throttledUpdate.cancel();
    };
  }, []);

  return {
    arrowButtonVisible,
    handleScrollLeft,
    handleScrollRight,
  };
}
