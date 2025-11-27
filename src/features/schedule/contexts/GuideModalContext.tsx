'use client';

import { getCookie, setCookie } from 'cookies-next';
import dayjs from 'dayjs';
import { createContext, useEffect, useState } from 'react';

import { SCHEDULE_GUIDE_MODAL } from '../constants';
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
  const [isGuideModalShown, setIsGuideModalShown] = useState(false);
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

  async function handleGuideModalClose() {
    await setCookie(SCHEDULE_GUIDE_MODAL, false, {
      expires: dayjs().add(1, 'month').toDate(),
    });
    setIsGuideModalShown(false);
  }

  useEffect(() => {
    async function hideGuideModalAndExtendCookie() {
      if (await getCookie(SCHEDULE_GUIDE_MODAL)) {
        await setCookie(SCHEDULE_GUIDE_MODAL, false, {
          expires: dayjs().add(1, 'month').toDate(),
        });
      } else {
        setIsGuideModalShown(true);
      }
    }
    hideGuideModalAndExtendCookie();
  }, []);

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
