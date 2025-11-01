'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

import BoardContent from './BoardContent';
import CircleArrowButtons from './CircleArrowButtons';
import TimeBlockPopUp from './TimeBlockPopUp';
import TopActions from './TopActions';
import useTimeBlockBoardPopUp from '@/features/schedule/hooks/useTimeBlockBoardPopUp';

export default function TimeBlockBoardContent() {
  const [isBoardContentHover, setIsBoardContentHover] = useState(false);

  const { isPopUpOpen, popUpData, handlePopUpOpen, handlePopUpClose } =
    useTimeBlockBoardPopUp();

  return (
    <motion.div
      onHoverStart={() => setIsBoardContentHover(true)}
      onHoverEnd={() => setIsBoardContentHover(false)}
      className="relative flex flex-col"
    >
      <CircleArrowButtons isBoardContentHover={isBoardContentHover} />
      <TopActions />
      <BoardContent onPopUpOpen={handlePopUpOpen} />
      {isPopUpOpen && (
        <TimeBlockPopUp onClose={handlePopUpClose} popUpData={popUpData} />
      )}
    </motion.div>
  );
}
