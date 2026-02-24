'use client';

import { createContext, useState } from 'react';

import { defaultSelectedDateTime } from '../constants';
import { SelectedDateTime } from '../types';

export const SelectedDateTimeContext = createContext<{
  selectedDateTime: SelectedDateTime;
  setSelectedDateTime: (dateTime: SelectedDateTime) => void;
  finalDateTime: SelectedDateTime;
  setFinalDateTime: (dateTime: SelectedDateTime) => void;
}>({
  selectedDateTime: defaultSelectedDateTime,
  setSelectedDateTime: () => {},
  finalDateTime: defaultSelectedDateTime,
  setFinalDateTime: () => {},
});

export default function SelectedDateTimeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedDateTime, setSelectedDateTime] = useState(
    defaultSelectedDateTime,
  );
  const [finalDateTime, setFinalDateTime] = useState(defaultSelectedDateTime);

  return (
    <SelectedDateTimeContext.Provider
      value={{
        selectedDateTime,
        setSelectedDateTime,
        finalDateTime,
        setFinalDateTime,
      }}
    >
      {children}
    </SelectedDateTimeContext.Provider>
  );
}
