'use client';

import { useContext } from 'react';

import { weekdaysShortKo } from '@/constants';
import { SleepTimeContext } from '@/features/my-schedule/contexts/SleepTimeContext';
import { MyScheduleTimeType } from '@/features/my-schedule/types';
import useTimeBlockFill from '@/hooks/useTimeBlockFill';
import cn from '@/lib/cn';

export default function BlockContent({
  mode,
  mySchedule,
  setMySchedule,
  backgroundColor = 'gray',
  setIsEdited,
}: {
  mode: 'view' | 'edit';
  mySchedule: MyScheduleTimeType[];
  setMySchedule?: (mySchedule: MyScheduleTimeType[]) => void;
  backgroundColor?: 'gray' | 'white';
  setIsEdited?: (isEdited: boolean) => void;
}) {
  const { handleTimeBlockClick: _handleTimeBlockClick, isClickedFirst } =
    useTimeBlockFill({
      isFilled,
      fillTimeBlocks: ({ timePoint, times, isFilling }) => {
        changeTimeBlock(timePoint, times, isFilling);
        setIsEdited?.(true);
      },
    });

  const { timesGroupForSplittedTimeBlock } = useContext(SleepTimeContext);

  function changeTimeBlock(
    weekday: string,
    times: string[],
    isFilling: boolean,
  ) {
    const newMySchedule = [...mySchedule];
    const weekdayIndex = newMySchedule.findIndex(
      (mySchedule) => mySchedule.time_point === weekday,
    );

    if (weekdayIndex === -1) {
      newMySchedule.push({ time_point: weekday, times });
    } else {
      newMySchedule[weekdayIndex].times = isFilling
        ? Array.from(new Set(newMySchedule[weekdayIndex].times.concat(times)))
        : newMySchedule[weekdayIndex].times.filter(
            (time) => !times.includes(time),
          );
    }

    setMySchedule?.(newMySchedule);
  }

  function handleTimeBlockClick(weekday: string, time: string) {
    if (mode === 'view') return;
    _handleTimeBlockClick({ timePoint: weekday, time });
  }

  function isFilled(weekday: string, time: string): boolean {
    return (
      mySchedule.find((s) => s.time_point === weekday)?.times.includes(time) ||
      false
    );
  }

  return (
    <div className="grid flex-1 grid-cols-7 gap-2">
      {weekdaysShortKo.map((weekday) => (
        <div
          key={weekday}
          className="flex flex-col gap-2 overflow-hidden rounded-lg"
        >
          {timesGroupForSplittedTimeBlock.map((timesGroup, index) => (
            <div key={index}>
              {timesGroup.map((time) => (
                <TimeBlock
                  key={time}
                  mode={mode}
                  backgroundColor={backgroundColor}
                  filled={isFilled(weekday, time)}
                  clickedFirst={isClickedFirst(weekday, time)}
                  onClick={() => handleTimeBlockClick(weekday, time)}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function TimeBlock({
  backgroundColor = 'gray',
  mode,
  filled,
  clickedFirst,
  ...props
}: {
  backgroundColor?: 'gray' | 'white';
  mode: 'view' | 'edit';
  filled?: boolean;
  clickedFirst?: boolean;
  onClick?: () => void;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'h-[3rem] border-b border-gray-10 bg-gray-05 last:border-b-0 odd:border-dashed even:border-solid',
        {
          'bg-gray-00': backgroundColor === 'white',
        },
        {
          'bg-gray-60': filled,
        },
        {
          'cursor-pointer': mode === 'edit',
        },
        {
          'border border-dashed border-gray-60 bg-gray-20 last:border-b even:border-dashed':
            clickedFirst,
        },
      )}
      {...props}
    />
  );
}
