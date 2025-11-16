'use client';

import { createContext, useState } from 'react';

import { guideContentsList } from '../data/guide-contents-list';
import { GuideContents } from '../types';

export const GuideModalContext = createContext<{
  isGuideModalShown: boolean;
  currentGuideContentsIndex: number;
  guideContentsListLength: number;
  guideContents: GuideContents;
  handleNextGuideContents: () => void;
  handleMoveGuideContents: (index: number) => void;
  handleGuideModalClose: () => void;
}>({
  isGuideModalShown: false,
  currentGuideContentsIndex: 0,
  guideContentsListLength: guideContentsList.length,
  guideContents: guideContentsList[0],
  handleNextGuideContents: () => {},
  handleMoveGuideContents: () => {},
  handleGuideModalClose: () => {},
});

export default function GuideModalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isGuideModalShown, setIsGuideModalShown] = useState(true);
  const [currentGuideContentsIndex, setCurrentGuideContentsIndex] = useState(0);

  const guideContentsListLength = guideContentsList.length;

  function handleNextGuideContents() {
    if (currentGuideContentsIndex === guideContentsListLength - 1) {
      handleGuideModalClose();
    } else {
      setCurrentGuideContentsIndex((prev) => prev + 1);
    }
  }

  function handleMoveGuideContents(index: number) {
    setCurrentGuideContentsIndex(index);
  }

  function handleGuideModalClose() {
    setIsGuideModalShown(false);
  }

  return (
    <GuideModalContext.Provider
      value={{
        isGuideModalShown,
        currentGuideContentsIndex,
        guideContentsListLength: guideContentsList.length,
        guideContents: guideContentsList[currentGuideContentsIndex],
        handleNextGuideContents,
        handleMoveGuideContents,
        handleGuideModalClose,
      }}
    >
      {children}
    </GuideModalContext.Provider>
  );
}
