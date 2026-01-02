import { DragControls, PanInfo, motion } from 'framer-motion';
import { forwardRef } from 'react';

interface BottomSheetProps {
  dragControls: DragControls;
  sheetHeight: number;
  onDragEnd: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => void;
  children: React.ReactNode;
}

const BottomSheetRoot = forwardRef<HTMLDivElement, BottomSheetProps>(
  ({ dragControls, sheetHeight, onDragEnd, children }, ref) => {
    return (
      <motion.div
        ref={ref}
        drag="y"
        dragListener={false}
        dragControls={dragControls}
        dragConstraints={{ top: 0, bottom: sheetHeight }}
        dragElastic={0.05}
        dragMomentum={false}
        onDragEnd={onDragEnd}
        style={{ height: sheetHeight }}
        className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-[30px] bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
      >
        {children}
      </motion.div>
    );
  },
);

BottomSheetRoot.displayName = 'BottomSheetRoot';

export default BottomSheetRoot;
