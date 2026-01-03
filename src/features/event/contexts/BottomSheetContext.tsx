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
  rootRef: AnimationScope | undefined;
  contentRef: HTMLElement | null;
  setContentRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  dragControls: DragControls;
  onDragEnd: (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  isOpen: boolean;
}>({
  rootRef: undefined,
  contentRef: null,
  setContentRef: () => {},
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
  const [contentRef, setContentRef] = useState<HTMLElement | null>(null);

  const [scope, animate] = useAnimate();
  const dragControls = useDragControls();

  const DRAG_THRESHOLD = 50;

  const springTransition = {
    type: 'spring' as const,
    damping: 30,
    stiffness: 400,
  };

  async function snapTo(y: number) {
    if (scope.current) {
      await animate(scope.current, { y }, springTransition);
    }
  }

  async function onDragEnd(
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) {
    const offset = info.offset.y;
    const velocity = info.velocity.y;

    const shouldOpen = offset < -DRAG_THRESHOLD || velocity < -500;
    const shouldClose = offset > DRAG_THRESHOLD || velocity > 500;

    if (!isOpen) {
      if (shouldOpen) {
        setIsOpen(true);
        await snapTo(0);
      } else {
        snapTo(bottomSheetHeight.collapsed);
      }
    } else {
      if (shouldClose) {
        setIsOpen(false);
        snapTo(bottomSheetHeight.collapsed);
        if (contentRef) contentRef.scrollTop = 0;
      } else {
        snapTo(0);
      }
    }
  }

  return (
    <BottomSheetContext.Provider
      value={{
        rootRef: scope,
        contentRef,
        setContentRef,
        dragControls,
        onDragEnd,
        isOpen,
      }}
    >
      {children}
    </BottomSheetContext.Provider>
  );
}
