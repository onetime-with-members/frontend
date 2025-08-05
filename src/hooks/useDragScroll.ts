import React, { useEffect, useState } from 'react';

type DragX = {
  init: number;
  min: number;
  max: number;
};

export default function useDragScroll({
  ref: scrollContainerRef,
  scrollSyncRef,
}: {
  ref: React.RefObject<HTMLElement | null>;
  scrollSyncRef?: React.RefObject<HTMLElement | null>;
}) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragX, setDragX] = useState<DragX>({
    init: 0,
    min: 0,
    max: 0,
  });
  const [initScrollLeft, setInitScrollLeft] = useState<number>(0);
  const [isDragEvent, setIsDragEvent] = useState<boolean>(false);

  const getClientX = (e: React.MouseEvent | React.TouchEvent): number => {
    if ('touches' in e) {
      return e.touches[0].clientX;
    }
    return e.clientX;
  };

  function handleDragStart(e: React.MouseEvent | React.TouchEvent) {
    if (!scrollContainerRef?.current) return;

    if (!('touches' in e)) {
      e.preventDefault();
    }

    setIsDragging(true);
    const startX = getClientX(e);
    setDragX({
      init: startX,
      min: startX,
      max: startX,
    });
    if (scrollContainerRef.current) {
      setInitScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  }

  function handleDragMove(e: React.MouseEvent | React.TouchEvent) {
    if (!isDragging || !scrollContainerRef?.current) return;
    const newDragX = getClientX(e);
    const dragDistance = dragX.init - newDragX;
    scrollContainerRef.current.scrollLeft = initScrollLeft + dragDistance;
    if (scrollSyncRef && scrollSyncRef.current) {
      scrollSyncRef.current.scrollLeft = initScrollLeft + dragDistance;
    }
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
