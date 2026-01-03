import { TargetAndTransition, motion } from 'framer-motion';
import { useContext } from 'react';

import { bottomSheetHeight } from '@/features/event/constants';
import { BottomSheetContext } from '@/features/event/contexts/BottomSheetContext';
import { opacityMotionProps } from '@/lib/motion-props';

export default function BottomSheetRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const { dragControls, onDragEnd, rootRef } = useContext(BottomSheetContext);

  return (
    <motion.div
      ref={rootRef}
      {...opacityMotionProps}
      initial={{
        ...(opacityMotionProps.initial as TargetAndTransition),
        y: bottomSheetHeight.collapsed,
      }}
      drag="y"
      dragListener={false}
      dragControls={dragControls}
      dragConstraints={{ top: 0, bottom: bottomSheetHeight.collapsed }}
      dragElastic={0.05}
      dragMomentum={false}
      onDragEnd={onDragEnd}
      style={{ height: bottomSheetHeight.all }}
      className="fixed bottom-0 left-0 right-0 z-40 flex flex-col rounded-t-[30px] bg-gray-00 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] will-change-transform"
    >
      {children}
    </motion.div>
  );
}
