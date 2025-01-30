import { useEffect, useState } from 'react';

interface useDragScrollProps<T> {
  ref: React.RefObject<T>;
}

type DragX = {
  init: number;
  min: number;
  max: number;
};

export default function useDragScroll<T>({ ref }: useDragScrollProps<T>) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragX, setDragX] = useState<DragX>({
    init: 0,
    min: 0,
    max: 0,
  });
  const [initScrollLeft, setInitScrollLeft] = useState<number>(0);
  const [isDragEvent, setIsDragEvent] = useState<boolean>(false);

  const scrollContainer = ref.current as unknown as HTMLElement;

  function handleDragStart(e: React.MouseEvent) {
    if (!scrollContainer) return;
    e.preventDefault();
    setIsDragging(true);
    setDragX({
      init: e.clientX,
      min: e.clientX,
      max: e.clientX,
    });
    setInitScrollLeft(scrollContainer.scrollLeft);
  }

  function handleDragMove(e: React.MouseEvent) {
    if (!isDragging || !scrollContainer) return;
    const newDragX = e.clientX;
    const dragDistance = dragX.init - newDragX;
    scrollContainer.scrollLeft = initScrollLeft + dragDistance;
    setDragX((prevDragX) => ({
      ...prevDragX,
      min: Math.min(prevDragX.min, newDragX),
      max: Math.max(prevDragX.max, newDragX),
    }));
  }

  function handleDragEnd() {
    if (!scrollContainer) return;
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
