import {
  AnimationScope,
  DragControls,
  PanInfo,
  useAnimate,
  useDragControls,
} from 'framer-motion';
import { createContext, useEffect, useState } from 'react';

export const BottomSheetContext = createContext<{
  ref: AnimationScope | undefined;
  dragControls: DragControls;
  sheetHeight: number;
  onDragEnd: (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  isOpen: boolean;
}>({
  ref: undefined,
  dragControls: new DragControls(),
  sheetHeight: 0,
  onDragEnd: () => {},
  isOpen: false,
});

export default function BottomSheetContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const [scope, animate] = useAnimate<HTMLDivElement>();
  const dragControls = useDragControls();

  const SHEET_HEIGHT = 500;
  const PEEK_HEIGHT = 150;
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

  function onDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
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
  }

  return (
    <BottomSheetContext.Provider
      value={{
        ref: scope,
        dragControls,
        sheetHeight: SHEET_HEIGHT,
        onDragEnd,
        isOpen,
      }}
    >
      {children}
    </BottomSheetContext.Provider>
  );
}
