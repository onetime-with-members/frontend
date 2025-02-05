import dayjs from 'dayjs';

import TimeBlock from './TimeBlock';
import useTimeBlockFill from '@/hooks/useTimeBlockFill';
import { MyScheduleTime } from '@/types/schedule.type';
import { timeBlockList } from '@/utils/time-block';

interface TimeBlockContentProps {
  mode: 'view' | 'edit';
  mySchedule: MyScheduleTime[];
  setMySchedule?: React.Dispatch<React.SetStateAction<MyScheduleTime[]>>;
  backgroundColor?: 'gray' | 'white';
  setIsEdited?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BoardContent({
  mode,
  mySchedule,
  setMySchedule,
  backgroundColor = 'gray',
  setIsEdited,
}: TimeBlockContentProps) {
  const { handleTimeBlockClick: _handleTimeBlockClick, isClickedFirst } =
    useTimeBlockFill({
      isFilled,
      fillTimeBlocks: ({ timePoint, times, isFilling }) => {
        changeTimeBlock(timePoint, times, isFilling);
        setIsEdited && setIsEdited(true);
      },
    });

  const timeBlockList = timeBlockList('00:00', '24:00', '30m');

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

    setMySchedule && setMySchedule(newMySchedule);
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
      {dayjs.weekdaysMin().map((weekday) => (
        <div key={weekday} className="overflow-hidden rounded-lg">
          {timeBlockList.map((time) => (
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
  );
}
