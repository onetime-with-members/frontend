import dayjs from 'dayjs';
import { useState } from 'react';

import TimeBlock from './TimeBlock';
import mySchedulesDefault from '@/data/ts/my-schedules';
import useTimeBlockFill from '@/hooks/useTimeBlockFill';
import { MyNewSchedule, MySchedule } from '@/types/schedule.type';
import { getBlockTimeList } from '@/utils/time-block';

interface TimeBlockContentProps {
  mode: 'view' | 'create' | 'edit';
  mySchedules: MySchedule[];
  setMyNewSchedule?: (newSchedule: MyNewSchedule['schedules']) => void;
  editedScheduleId?: number;
  backgroundColor?: 'gray' | 'white';
  setIsEdited?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BoardContent({
  mode,
  backgroundColor = 'gray',
  setIsEdited,
}: TimeBlockContentProps) {
  const [mySchedules, setMySchedules] =
    useState<MySchedule[]>(mySchedulesDefault);

  const { handleTimeBlockClick: _handleTimeBlockClick, isClickedFirst } =
    useTimeBlockFill({
      isFilled,
      fillTimeBlocks: ({ timePoint, times, isFilling }) => {
        changeTimeBlock(timePoint, times, isFilling);
        setIsEdited && setIsEdited(true);
      },
    });

  const timeBlockList = getBlockTimeList('00:00', '24:00', '30m');

  function changeTimeBlock(
    weekday: string,
    times: string[],
    isFilling: boolean,
  ) {
    setMySchedules((prevMySchedules) =>
      prevMySchedules.map((mySchedule) =>
        mySchedule.time_point === weekday
          ? {
              ...mySchedule,
              times: isFilling
                ? Array.from(new Set(mySchedule.times.concat(times)))
                : mySchedule.times.filter((time) => !times.includes(time)),
            }
          : mySchedule,
      ),
    );
  }

  function handleTimeBlockClick(weekday: string, time: string) {
    if (mode === 'view') return;
    _handleTimeBlockClick({ timePoint: weekday, time });
  }

  function isFilled(weekday: string, time: string): boolean {
    return (
      mySchedules
        .find((schedule) => schedule.time_point === weekday)
        ?.times.includes(time) || false
    );
  }

  return (
    <div className="grid flex-1 grid-cols-7 gap-2">
      {dayjs.weekdaysMin().map((weekday) => (
        <div key={weekday} className="overflow-hidden rounded-lg">
          {timeBlockList.map((time) => (
            <TimeBlock
              key={time}
              backgroundColor={backgroundColor}
              filled={isFilled(weekday, time)}
              clickedFirst={isClickedFirst(weekday, time)}
              onClick={() => handleTimeBlockClick(weekday, time)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
