import { motion } from 'framer-motion';
import { useContext } from 'react';

import { BottomSheetContext } from '@/features/event/contexts/BottomSheetContext';

export default function BottomSheetRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const { dragControls, sheetHeight, onDragEnd, ref } =
    useContext(BottomSheetContext);

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
      className="fixed bottom-0 left-0 right-0 z-40 flex flex-col rounded-t-[30px] bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
    >
      {children}
    </motion.div>
  );
}
