import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';

import Participants from './Participants/Participants';
import RecommendTime from './RecommendTime/RecommendTime';
import CircleArrowButton from '@/components/button/CircleArrowButton/CircleArrowButton';
import useScrollArrowButton from '@/hooks/useScrollArrowButton';

export default function BannerList() {
  const [isHover, setIsHover] = useState(false);

  const topDialogListRef = useRef<HTMLDivElement>(null);

  const { arrowButtonVisible, handleScrollLeft, handleScrollRight } =
    useScrollArrowButton({ ref: topDialogListRef });

  return (
    <motion.div
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      className="relative"
    >
      <AnimatePresence>
        {!isMobile && arrowButtonVisible.left && isHover && (
          <CircleArrowButton
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            direction="left"
            className="absolute left-10 top-1/2 -translate-y-1/2 sm:left-16"
            onClick={handleScrollLeft}
          />
        )}
      </AnimatePresence>
      <div
        ref={topDialogListRef}
        className="scrollbar-hidden mt-4 flex w-full items-stretch gap-4 overflow-x-scroll"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        <RecommendTime />
        <Participants />
      </div>
      <AnimatePresence>
        {!isMobile && arrowButtonVisible.right && isHover && (
          <CircleArrowButton
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            direction="right"
            className="absolute right-10 top-1/2 -translate-y-1/2 sm:right-16"
            onClick={handleScrollRight}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
