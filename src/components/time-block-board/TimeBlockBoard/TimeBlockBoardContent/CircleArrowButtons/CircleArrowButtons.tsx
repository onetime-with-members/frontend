import { useContext } from 'react';
import { isMobile } from 'react-device-detect';

import CircleArrowButtonForBoard from './CircleArrowButtonForBoard';
import { TimeBlockBoardContext } from '@/features/schedule/contexts/TimeBlockBoardContext';
import useScrollArrowButton from '@/features/schedule/hooks/useScrollArrowButton';

export default function CircleArrowButtons({
  isBoardContentHover,
}: {
  isBoardContentHover: boolean;
}) {
  const { topLabelRef, boardContentRef } = useContext(TimeBlockBoardContext);

  const { arrowButtonVisible, handleScrollLeft, handleScrollRight } =
    useScrollArrowButton({
      ref: boardContentRef,
      scrollSyncRef: topLabelRef,
    });

  return (
    <>
      <CircleArrowButtonForBoard
        direction="left"
        isVisible={!isMobile && arrowButtonVisible.left && isBoardContentHover}
        onClick={handleScrollLeft}
      />
      <CircleArrowButtonForBoard
        direction="right"
        isVisible={!isMobile && arrowButtonVisible.right && isBoardContentHover}
        onClick={handleScrollRight}
      />
    </>
  );
}
