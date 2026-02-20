'use client';

import { getCookie, setCookie } from 'cookies-next';
import { useTranslations } from 'next-intl';
import { createContext, useEffect, useState } from 'react';

import {
  useCloseScheduleGuideModalMutation,
  useScheduleGuideModalViewLog,
} from '../api/schedule.query';
import { SCHEDULE_GUIDE_MODAL, defaultGuideContents } from '../constants';
import { guideContentsList } from '../data/guide-contents-list';
import { GuideContents } from '../types';
import { useAuth } from '@/lib/auth';
import dayjs from '@/lib/dayjs';

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
  guideContentsListLength: 0,
  guideContents: defaultGuideContents,
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

  const t = useTranslations();

  const { isLoggedIn } = useAuth();
  const { data: scheduleGuideModalViewLog } = useScheduleGuideModalViewLog();

  const { mutateAsync: closeScheduleGuideModal, isLoading: isCloseLoading } =
    useCloseScheduleGuideModalMutation();

  const guideContentsListLength = guideContentsList(t).length;

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
    if (isCloseLoading) return;
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
        ? scheduleGuideModalViewLog.is_viewed
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
  }, [isLoggedIn, scheduleGuideModalViewLog]);

  return (
    <GuideModalContext.Provider
      value={{
        isGuideModalShown,
        currentGuideContentsIndex,
        guideContentsListLength,
        guideContents: guideContentsList(t)[currentGuideContentsIndex],
        handleNextGuideContents,
        handleMoveGuideContents,
        handleGuideModalClose,
      }}
    >
      {children}
    </GuideModalContext.Provider>
  );
}
