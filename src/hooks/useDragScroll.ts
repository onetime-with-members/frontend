import { useEffect, useState } from 'react';

interface useDragScrollProps {
  ref: React.RefObject<HTMLElement | null>;
}

type DragX = {
  init: number;
  min: number;
  max: number;
};

export default function useDragScroll({ ref }: useDragScrollProps) {
  const [scrollContainerRef, setScrollContainerRef] =
    useState<React.RefObject<HTMLElement | null>>();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragX, setDragX] = useState<DragX>({
    init: 0,
    min: 0,
    max: 0,
  });
  const [initScrollLeft, setInitScrollLeft] = useState<number>(0);
  const [isDragEvent, setIsDragEvent] = useState<boolean>(false);

  function handleDragStart(e: React.MouseEvent) {
    if (!scrollContainerRef?.current) return;
    e.preventDefault();
    setIsDragging(true);
    setDragX({
      init: e.clientX,
      min: e.clientX,
      max: e.clientX,
    });
    setInitScrollLeft(scrollContainerRef.current.scrollLeft);
  }

  function handleDragMove(e: React.MouseEvent) {
    if (!isDragging || !scrollContainerRef?.current) return;
    const newDragX = e.clientX;
    const dragDistance = dragX.init - newDragX;
    scrollContainerRef.current.scrollLeft = initScrollLeft + dragDistance;
    setDragX((prevDragX) => ({
      ...prevDragX,
      min: Math.min(prevDragX.min, newDragX),
      max: Math.max(prevDragX.max, newDragX),
    }));
  }

  function handleDragEnd() {
    if (!scrollContainerRef?.current) return;
    setIsDragging(false);
  }

  function handleDragLeave() {
    handleDragEnd();
  }

  useEffect(() => {
    if (ref.current) {
      setScrollContainerRef(ref);
    }
  }, [ref]);

  useEffect(() => {
    setIsDragEvent(dragX.max - dragX.min >= 10);
  }, [dragX.max, dragX.min]);

  return {
    isDragEvent,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    handleDragLeave,
  };
}
