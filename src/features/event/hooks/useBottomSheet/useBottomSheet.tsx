import { PanInfo, useAnimate, useDragControls } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function useBottomSheet() {
  const [isOpen, setIsOpen] = useState(false);

  const [scope, animate] = useAnimate();
  const dragControls = useDragControls();

  const SHEET_HEIGHT = window.innerHeight * 0.8;
  const PEEK_HEIGHT = 160;
  const DRAG_THRESHOLD = 50;

  const springTransition = {
    type: 'spring' as const,
    damping: 30,
    stiffness: 400,
  };

  const snapTo = async (y: number) => {
    if (scope.current) {
      await animate(scope.current, { y }, springTransition);
    }
  };

  useEffect(() => {
    snapTo(SHEET_HEIGHT - PEEK_HEIGHT);
  }, [SHEET_HEIGHT]);

  useEffect(() => {
    if (isOpen) {
      snapTo(0);
    } else {
      snapTo(SHEET_HEIGHT - PEEK_HEIGHT);
    }
  }, [isOpen, SHEET_HEIGHT]);

  const onDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const offset = info.offset.y;
    const velocity = info.velocity.y;

    if (!isOpen) {
      if (offset < -DRAG_THRESHOLD || velocity < -500) {
        setIsOpen(true);
      } else {
        snapTo(SHEET_HEIGHT - PEEK_HEIGHT);
      }
    } else {
      if (offset > DRAG_THRESHOLD || velocity > 500) {
        setIsOpen(false);
      } else {
        snapTo(0);
      }
    }
  };

  return {
    ref: scope,
    dragControls,
    SHEET_HEIGHT,
    onDragEnd,
  };
}
