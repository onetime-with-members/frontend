'use client';

import { motion } from 'framer-motion';
import { useContext } from 'react';

import BoardContent from './BoardContent';
import CircleArrowButtons from './CircleArrowButtons';
import TimeBlockPopUp from './TimeBlockPopUp';
import TopActions from './TopActions';
import { TimeBlockBoardContext } from '@/features/schedule/contexts/TimeBlockBoardContext';
import { TimeBlockPopUpContext } from '@/features/schedule/contexts/TimeBlockPopUpContext';

export default function TimeBlockBoardContent() {
  const { handleBoardHoverStart, handleBoardHoverEnd } = useContext(
    TimeBlockBoardContext,
  );
  const { isPopUpOpen } = useContext(TimeBlockPopUpContext);

  return (
    <motion.div
      onHoverStart={handleBoardHoverStart}
      onHoverEnd={handleBoardHoverEnd}
      className="relative flex flex-col"
    >
      <CircleArrowButtons />
      <TopActions />
      <BoardContent />
      {isPopUpOpen && <TimeBlockPopUp />}
    </motion.div>
  );
}
