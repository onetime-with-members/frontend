import {
  AnimationScope,
  DragControls,
  PanInfo,
  useAnimate,
  useDragControls,
} from 'framer-motion';
import { createContext, useState } from 'react';

import { bottomSheetHeight } from '../constants';

export const BottomSheetContext = createContext<{
  ref: AnimationScope | undefined;
  dragControls: DragControls;
  onDragEnd: (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  isOpen: boolean;
}>({
  ref: undefined,
  dragControls: new DragControls(),
  onDragEnd: () => {},
  isOpen: false,
});

export default function BottomSheetContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const [scope, animate] = useAnimate();
  const dragControls = useDragControls();

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

  const onDragEnd = async (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const offset = info.offset.y;
    const velocity = info.velocity.y;

    const shouldOpen = offset < -DRAG_THRESHOLD || velocity < -500;
    const shouldClose = offset > DRAG_THRESHOLD || velocity > 500;

    if (!isOpen) {
      if (shouldOpen) {
        await snapTo(0);
        setIsOpen(true);
      } else {
        snapTo(bottomSheetHeight.collapsed);
      }
    } else {
      if (shouldClose) {
        setIsOpen(false);
        snapTo(bottomSheetHeight.collapsed);
      } else {
        snapTo(0);
      }
    }
  };

  return (
    <BottomSheetContext.Provider
      value={{
        ref: scope,
        dragControls,
        onDragEnd,
        isOpen,
      }}
    >
      {children}
    </BottomSheetContext.Provider>
  );
}
