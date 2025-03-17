import { useEffect, useState } from 'react';

interface UseScrollArrowButtonProps {
  ref: React.RefObject<HTMLElement | null>;
}

export default function useScrollArrowButton({
  ref,
}: UseScrollArrowButtonProps) {
  const [arrowButtonVisible, setArrowButtonVisible] = useState({
    left: false,
    right: true,
  });

  function handleScrollLeft() {
    ref.current?.scrollBy({
      left: -ref.current.clientWidth,
      behavior: 'smooth',
    });
  }

  function handleScrollRight() {
    ref.current?.scrollBy({
      left: ref.current.clientWidth,
      behavior: 'smooth',
    });
  }

  useEffect(() => {
    if (!ref.current) return;

    const scrollableElement = ref.current;

    function handleScroll() {
      if (!scrollableElement) return;
      setArrowButtonVisible((prev) => ({
        ...prev,
        left: scrollableElement.scrollLeft !== 0,
      }));
      setArrowButtonVisible((prev) => ({
        ...prev,
        right:
          Math.ceil(scrollableElement.scrollLeft) <
          scrollableElement.scrollWidth - scrollableElement.clientWidth,
      }));
    }

    scrollableElement.addEventListener('scroll', handleScroll);

    return () => {
      scrollableElement.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);

  return {
    arrowButtonVisible,
    handleScrollLeft,
    handleScrollRight,
  };
}
