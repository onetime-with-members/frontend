'use client';

import React, { ReactNode, createContext, useState } from 'react';

import { defaultGuestValues } from '../constants';
import { GuestValueType } from '@/lib/types';

type ScheduleFormContextType = {
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  guestValue: GuestValueType;
  setGuestValue: React.Dispatch<React.SetStateAction<GuestValueType>>;
  isBackButtonAlertOpen: boolean;
  setIsBackButtonAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isScheduleEdited: boolean;
  setIsScheduleEdited: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
};

export const ScheduleFormContext = createContext<ScheduleFormContextType>({
  pageIndex: 0,
  setPageIndex: () => {},
  guestValue: defaultGuestValues,
  setGuestValue: () => {},
  isBackButtonAlertOpen: false,
  setIsBackButtonAlertOpen: () => {},
  isScheduleEdited: false,
  setIsScheduleEdited: () => {},
  isLoggedIn: false,
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

  return (
    <ScheduleFormContext.Provider
      value={{
        pageIndex,
        setPageIndex,
        guestValue,
        setGuestValue,
        isBackButtonAlertOpen,
        setIsBackButtonAlertOpen,
        isScheduleEdited,
        setIsScheduleEdited,
        isLoggedIn,
      }}
    >
      {children}
    </ScheduleFormContext.Provider>
  );
}
