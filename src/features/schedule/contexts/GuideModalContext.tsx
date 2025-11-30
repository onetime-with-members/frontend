'use client';

import { getCookie, setCookie } from 'cookies-next';
import dayjs from 'dayjs';
import { createContext, useEffect, useState } from 'react';

import {
  useCloseScheduleGuideModalMutation,
  useScheduleGuideModalViewStatus,
} from '../api/schedule.query';
import { SCHEDULE_GUIDE_MODAL } from '../constants';
import { guideContentsList } from '../data/guide-contents-list';
import { GuideContents } from '../types';
import { useAuth } from '@/lib/auth';

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

  const { isLoggedIn } = useAuth();

  const { data: scheduleGuideModalViewStatus } =
    useScheduleGuideModalViewStatus();

  const { mutateAsync: closeScheduleGuideModal } =
    useCloseScheduleGuideModalMutation();

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
    if (isLoggedIn) {
      await closeScheduleGuideModal();
    }
    await setCookie(SCHEDULE_GUIDE_MODAL, false, {
      expires: dayjs().add(1, 'month').toDate(),
    });
    setIsGuideModalShown(false);
  }

  useEffect(() => {
    (async () => {
      const isViewed = isLoggedIn
        ? scheduleGuideModalViewStatus.is_viewed
        : !!(await getCookie(SCHEDULE_GUIDE_MODAL));
      if (isViewed) {
        setIsGuideModalShown(false);
        await setCookie(SCHEDULE_GUIDE_MODAL, false, {
          expires: dayjs().add(1, 'month').toDate(),
        });
      } else {
        setIsGuideModalShown(true);
      }
    })();
  }, [isLoggedIn, scheduleGuideModalViewStatus]);

  useEffect(() => {
    (async () => {})();
  }, [isLoggedIn]);

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
