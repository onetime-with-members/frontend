import { motion } from 'framer-motion';
import { useContext } from 'react';

import {
  BOTTOM_SHEET_HEIGHT,
  BOTTOM_SHEET_PEEK_HEIGHT,
} from '@/features/event/constants';
import { BottomSheetContext } from '@/features/event/contexts/BottomSheetContext';

export default function BottomSheetRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const { dragControls, onDragEnd, ref } = useContext(BottomSheetContext);

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: BOTTOM_SHEET_HEIGHT - BOTTOM_SHEET_PEEK_HEIGHT,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      drag="y"
      dragListener={false}
      dragControls={dragControls}
      dragConstraints={{ top: 0, bottom: BOTTOM_SHEET_HEIGHT }}
      dragElastic={0.05}
      dragMomentum={false}
      onDragEnd={onDragEnd}
      style={{ height: BOTTOM_SHEET_HEIGHT }}
      className="fixed bottom-0 left-0 right-0 z-40 flex flex-col rounded-t-[30px] bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.1)] will-change-transform"
    >
      {children}
    </motion.div>
  );
}
