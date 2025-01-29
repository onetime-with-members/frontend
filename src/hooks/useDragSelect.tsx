import { useState } from 'react';

interface useDragSelectProps {
  onSelect: (event: React.MouseEvent | React.TouchEvent) => void;
}

export default function useDragSelect({ onSelect }: useDragSelectProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isFilling, setIsFilling] = useState(false);
  const [isDragMoved, setIsDragMoved] = useState(false);

  const cssStyle: React.CSSProperties = {
    touchAction: 'none',
  };

  function handleDragStart({ isFilling }: { isFilling: boolean }) {
    setIsDragging(true);
    setIsFilling(isFilling);
  }

  function handleDragMove(event: React.MouseEvent | React.TouchEvent) {
    if (!isDragging) return;
    onSelect(event);
    setIsDragMoved(true);
  }

  function handleDragEnd(event: React.MouseEvent | React.TouchEvent) {
    if (!isDragMoved) {
      handleDragMove(event);
    }
    setIsDragging(false);
    setIsFilling(false);
    setIsDragMoved(false);
  }

  return {
    isFilling,
    cssStyle,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  };
}
