import { useRef } from 'react';
import { isMobile } from 'react-device-detect';

import CircleArrowButton from './CircleArrowButton/CircleArrowButton';
import Participants from './Participants/Participants';
import RecommendTime from './RecommendTime/RecommendTime';
import useScrollArrowButton from '@/hooks/useScrollArrowButton';
import cn from '@/utils/cn';

export default function BannerList() {
  const topDialogListRef = useRef<HTMLDivElement>(null);

  const { arrowButtonVisible, handleScrollLeft, handleScrollRight } =
    useScrollArrowButton({ ref: topDialogListRef });

  return (
    <div className="group relative">
      {!isMobile && (
        <CircleArrowButton
          direction="left"
          className={cn(
            'absolute left-10 top-1/2 -translate-y-1/2 group-hover:opacity-0 sm:left-16',
            {
              'group-hover:opacity-100': arrowButtonVisible.left,
            },
          )}
          onClick={handleScrollLeft}
        />
      )}
      <div
        ref={topDialogListRef}
        className="scrollbar-hidden mt-4 flex w-full items-stretch gap-4 overflow-x-scroll"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        <RecommendTime />
        <Participants />
      </div>
      {!isMobile && (
        <CircleArrowButton
          direction="right"
          className={cn(
            'absolute right-10 top-1/2 -translate-y-1/2 group-hover:opacity-0 sm:right-16',
            {
              'group-hover:opacity-100': arrowButtonVisible.right,
            },
          )}
          onClick={handleScrollRight}
        />
      )}
    </div>
  );
}
