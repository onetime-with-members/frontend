'use client';

import React, { ReactNode, createContext, useEffect, useState } from 'react';

import { defaultGuestValues } from '../constants';
import { GuestValueType } from '../types';
import { useProgressRouter } from '@/navigation';

export const ScheduleFormContext = createContext<{
  pageIndex: number;
  guestValue: GuestValueType;
  setGuestValue: React.Dispatch<React.SetStateAction<GuestValueType>>;
  isBackButtonAlertOpen: boolean;
  setIsBackButtonAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isScheduleEdited: boolean;
  setIsScheduleEdited: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  handleBackButtonClick: () => void;
  handleNextPage: () => void;
}>({
  pageIndex: 0,
  guestValue: defaultGuestValues,
  setGuestValue: () => {},
  isBackButtonAlertOpen: false,
  setIsBackButtonAlertOpen: () => {},
  isScheduleEdited: false,
  setIsScheduleEdited: () => {},
  isLoggedIn: false,
  handleBackButtonClick: () => {},
  handleNextPage: () => {},
});

export default function ScheduleFormContextProvider({
  isLoggedIn,
  children,
}: {
  isLoggedIn: boolean;
  children: ReactNode;
}) {
  const [pageIndex, setPageIndex] = useState(isLoggedIn ? 1 : 0);
  const [guestValue, setGuestValue] =
    useState<GuestValueType>(defaultGuestValues);
  const [isBackButtonAlertOpen, setIsBackButtonAlertOpen] = useState(false);
  const [isScheduleEdited, setIsScheduleEdited] = useState(false);

  const progressRouter = useProgressRouter();

  function handleBackButtonClick() {
    if (pageIndex === 0) {
      closePage();
    } else if (pageIndex === 1) {
      if (isLoggedIn) {
        closePage();
      } else {
        setPageIndex((prev) => prev - 1);
      }
    }

    function closePage() {
      if (isScheduleEdited) {
        setIsBackButtonAlertOpen(true);
      } else {
        progressRouter.back();
      }
    }
  }

  function handleNextPage() {
    setPageIndex((prev) => prev + 1);
  }

  useEffect(() => {
    setPageIndex(isLoggedIn ? 1 : 0);
  }, [isLoggedIn]);

  return (
    <ScheduleFormContext.Provider
      value={{
        pageIndex,
        guestValue,
        setGuestValue,
        isBackButtonAlertOpen,
        setIsBackButtonAlertOpen,
        isScheduleEdited,
        setIsScheduleEdited,
        isLoggedIn,
        handleBackButtonClick,
        handleNextPage,
      }}
    >
      {children}
    </ScheduleFormContext.Provider>
  );
}
