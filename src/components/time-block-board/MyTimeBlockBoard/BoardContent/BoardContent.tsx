import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';

import TimeBlock from './TimeBlock/TimeBlock';
import useTimeBlockFill from '@/hooks/useTimeBlockFill';
import { changeTimeBlock } from '@/store/fixed-schedules';
import { AppDispatch, RootState } from '@/store/store';
import { timeBlockList as _timeBlockList } from '@/utils/time-block';

interface TimeBlockContentProps {
  mode: 'view' | 'edit';
  backgroundColor?: 'gray' | 'white';
}

export default function BoardContent({
  mode,
  backgroundColor = 'gray',
}: TimeBlockContentProps) {
  const { fixedSchedules } = useSelector(
    (state: RootState) => state.fixedSchedules,
  );
  const { timeBlockGroup } = useSelector((state: RootState) => state.sleepTime);
  const dispatch = useDispatch<AppDispatch>();

  const { handleTimeBlockClick: onTimeBlockClick, isClickedFirst } =
    useTimeBlockFill({
      isFilled,
      fillTimeBlocks: ({ timePoint, times, isFilling }) => {
        dispatch(changeTimeBlock({ timePoint, times, isFilling }));
      },
    });

  function handleTimeBlockClick(weekday: string, time: string) {
    if (mode === 'view') return;
    onTimeBlockClick({ timePoint: weekday, time });
  }

  function isFilled(weekday: string, time: string): boolean {
    return (
      fixedSchedules
        .find((s) => s.time_point === weekday)
        ?.times.includes(time) || false
    );
  }

  return (
    <div className="grid flex-1 grid-cols-7 gap-2">
      {dayjs.weekdaysMin().map((weekday) => (
        <div
          key={weekday}
          className="flex flex-col gap-2 overflow-hidden rounded-lg"
        >
          {timeBlockGroup.map((timesGroup, index) => (
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
