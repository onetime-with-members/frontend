import { createContext, useContext, useState } from 'react';

import { defaultTimeBlockPopUpData } from '../constants';
import { TimeBlockPopUpDataType, TimeBlockPopUpOpenProps } from '../types';
import { TimeBlockBoardContext } from './TimeBlockBoardContext';

export const TimeBlockPopUpContext = createContext<{
  isPopUpOpen: boolean;
  popUpData: TimeBlockPopUpDataType;
  handlePopUpOpen: (props: TimeBlockPopUpOpenProps) => void;
  handlePopUpClose: () => void;
}>({
  isPopUpOpen: false,
  popUpData: defaultTimeBlockPopUpData,
  handlePopUpOpen: () => {},
  handlePopUpClose: () => {},
});

export default function TimeBlockPopUpContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [popUpData, setPopUpData] = useState<TimeBlockPopUpDataType>(
    defaultTimeBlockPopUpData,
  );

  const { schedules } = useContext(TimeBlockBoardContext);

  function handlePopUpOpen({ timePoint, time }: TimeBlockPopUpOpenProps) {
    if (schedules.length === 0) return;

    let members: TimeBlockPopUpDataType['members'] = {
      possible: [],
      impossible: [],
    };

    schedules.forEach((schedule) => {
      if (
        schedule.schedules
          .find((s) => s.time_point === timePoint)
          ?.times.includes(time)
      ) {
        members.possible.push(schedule.name);
      } else {
        members.impossible.push(schedule.name);
      }
    });

    members = {
      possible: members.possible.sort(),
      impossible: members.impossible.sort(),
    };

    setPopUpData({
      timePoint,
      time,
      members,
    });
    setIsPopUpOpen(true);
  }

  function handlePopUpClose() {
    setIsPopUpOpen(false);
  }

  return (
    <TimeBlockPopUpContext.Provider
      value={{ isPopUpOpen, popUpData, handlePopUpOpen, handlePopUpClose }}
    >
      {children}
    </TimeBlockPopUpContext.Provider>
  );
}
