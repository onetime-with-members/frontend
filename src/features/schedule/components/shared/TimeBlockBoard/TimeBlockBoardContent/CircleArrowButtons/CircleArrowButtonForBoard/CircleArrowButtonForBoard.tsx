import { AnimatePresence, motion } from 'framer-motion';
import { useContext } from 'react';

import CircleArrowButton from './CircleArrowButton';
import { TimeBlockBoardContext } from '@/features/schedule/contexts/TimeBlockBoardContext';
import useTargetSticky from '@/features/schedule/hooks/useTargetSticky';
import cn from '@/lib/cn';

export default function CircleArrowButtonForBoard({
  isVisible,
  direction,
  onClick,
}: {
  isVisible: boolean;
  direction: 'left' | 'right';
  onClick: () => void;
}) {
  const { topLabelRef, boardContentRef } = useContext(TimeBlockBoardContext);

  const { isTargetOnBottom } = useTargetSticky({
    topRef: topLabelRef,
    scrollableElementRef: boardContentRef,
    targetHeight: 40,
    targetTopOffset: 160,
    targetBottomOffset: 160,
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn('sticky top-[174px] z-[5] md:top-[186px]', {
            static: isTargetOnBottom,
          })}
        >
          <CircleArrowButton
            direction={direction}
            className={cn('absolute z-10 mt-40', {
              'bottom-40 mt-0': isTargetOnBottom,
              'left-10': direction === 'left',
              'right-6': direction === 'right',
            })}
            onClick={onClick}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
