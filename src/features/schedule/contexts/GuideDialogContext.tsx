'use client';

import { createContext, useState } from 'react';

import { guideContentsList } from '../data/guide-contents-list';
import { GuideContents } from '../types';

export const GuideDialogContext = createContext<{
  isGuideDialogShown: boolean;
  currentGuideContentsIndex: number;
  guideContentsListLength: number;
  guideContents: GuideContents;
  handleNextGuideContents: () => void;
  handleMoveGuideContents: (index: number) => void;
}>({
  isGuideDialogShown: false,
  currentGuideContentsIndex: 0,
  guideContentsListLength: guideContentsList.length,
  guideContents: guideContentsList[0],
  handleNextGuideContents: () => {},
  handleMoveGuideContents: () => {},
});

export default function GuidePopUpContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isGuideDialogShown, setIsGuideDialogShown] = useState(true);
  const [currentGuideContentsIndex, setCurrentGuideContentsIndex] = useState(0);

  const guideContentsListLength = guideContentsList.length;

  function handleNextGuideContents() {
    if (currentGuideContentsIndex === guideContentsListLength - 1) {
      setIsGuideDialogShown(false);
    } else {
      setCurrentGuideContentsIndex((prev) => prev + 1);
    }
  }

  function handleMoveGuideContents(index: number) {
    setCurrentGuideContentsIndex(index);
  }

  return (
    <GuideDialogContext.Provider
      value={{
        isGuideDialogShown,
        currentGuideContentsIndex,
        guideContentsListLength: guideContentsList.length,
        guideContents: guideContentsList[currentGuideContentsIndex],
        handleNextGuideContents,
        handleMoveGuideContents,
      }}
    >
      {children}
    </GuideDialogContext.Provider>
  );
}
