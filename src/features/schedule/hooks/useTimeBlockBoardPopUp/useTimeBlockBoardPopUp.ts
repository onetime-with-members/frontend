import { useContext, useState } from 'react';

import { TimeBlockBoardContext } from '../../contexts/TimeBlockBoardContext';
import { TimeBlockPopUpDataType } from '../../types';

export default function useTimeBlockBoardPopUp() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [popUpData, setPopUpData] = useState<TimeBlockPopUpDataType>({
    timePoint: '',
    time: '',
    members: {
      possible: [],
      impossible: [],
    },
  });

  const { schedules } = useContext(TimeBlockBoardContext);

  function handlePopUpOpen({
    timePoint,
    time,
  }: {
    timePoint: string;
    time: string;
  }) {
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

  return { isPopUpOpen, popUpData, handlePopUpOpen, handlePopUpClose };
}
