import { useState } from 'react';

interface useDragSelectProps<T> {
  datasetKey: string;
  selectFn: (params: { data: T; isFilling: boolean }) => void;
}

export default function useDragSelect<T>({
  datasetKey,
  selectFn,
}: useDragSelectProps<T>) {
  const [isDragging, setIsDragging] = useState(false);
  const [isFilling, setIsFilling] = useState(false);
  const [isMoved, setIsMoved] = useState(false);

  const touchScrollDisableStyle: React.CSSProperties = {
    touchAction: 'none',
  };

  function handleDragStart({ isFilling }: { isFilling: boolean }) {
    setIsDragging(true);
    setIsFilling(isFilling);
  }

  function handleDragMove({
    event,
  }: {
    event: React.MouseEvent | React.TouchEvent;
  }) {
    if (!isDragging) return;
    const dataOfDataset: T = dataOfDatasetFor({ event }) as T;
    if (!dataOfDataset) return;
    selectFn({ data: dataOfDataset, isFilling });
    setIsMoved(true);
  }

  function handleDragEnd({
    event,
  }: {
    event: React.MouseEvent | React.TouchEvent;
  }) {
    if (!isMoved) {
      handleDragMove({ event });
    }
    setIsDragging(false);
    setIsFilling(false);
    setIsMoved(false);
  }

  function dataOfDatasetFor({
    event,
  }: {
    event: React.MouseEvent | React.TouchEvent;
  }) {
    let result;
    if (event.type === 'mousemove' || event.type === 'mouseup') {
      result = (event.target as HTMLElement).dataset[datasetKey];
      if (!result) return;
    } else if (event.type === 'touchmove') {
      const touch = (event as React.TouchEvent).touches[0];
      const touchedTarget = document.elementFromPoint(
        touch.clientX,
        touch.clientY,
      ) as HTMLElement;
      if (!touchedTarget) return;
      result = touchedTarget.dataset[datasetKey];
    }
    return result;
  }

  return {
    touchScrollDisableStyle,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  };
}
