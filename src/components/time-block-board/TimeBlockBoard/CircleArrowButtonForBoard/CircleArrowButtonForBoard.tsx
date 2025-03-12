import { AnimatePresence, motion } from 'framer-motion';

import CircleArrowButton from '@/components/button/CircleArrowButton/CircleArrowButton';
import cn from '@/utils/cn';

interface CircleArrowButtonForBoardProps {
  isVisible: boolean;
  direction: 'left' | 'right';
  onClick: () => void;
  isTargetOnBottom: boolean;
}

export default function CircleArrowButtonForBoard({
  isVisible,
  direction,
  onClick,
  isTargetOnBottom,
}: CircleArrowButtonForBoardProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn('sticky top-[174px] z-[5]', {
            static: isTargetOnBottom,
          })}
        >
          <CircleArrowButton
            direction={direction}
            className={cn('absolute z-10 mt-40', {
              'bottom-40 mt-0': isTargetOnBottom,
              'left-10': direction === 'left',
              'right-10': direction === 'right',
            })}
            onClick={onClick}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
