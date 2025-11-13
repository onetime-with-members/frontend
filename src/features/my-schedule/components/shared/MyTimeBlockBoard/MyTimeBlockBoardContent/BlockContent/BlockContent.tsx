import { useContext } from 'react';

import TimeBlock from './TimeBlock';
import { weekdaysShortKo } from '@/constants';
import { MyTimeBlockBoardContext } from '@/features/my-schedule/contexts/MyTimeBlockBoardContext';
import { SleepTimeContext } from '@/features/my-schedule/contexts/SleepTimeContext';
import { isFilled } from '@/features/my-schedule/utils';
import useTimeBlockFill from '@/features/schedule/hooks/useTimeBlockFill';

export default function BlockContent() {
  const { setIsEdited, mySchedule, setMySchedule, mode } = useContext(
    MyTimeBlockBoardContext,
  );
  const { timesGroupForSplittedTimeBlock } = useContext(SleepTimeContext);

  const { handleTimeBlockClick: _handleTimeBlockClick, isClickedFirst } =
    useTimeBlockFill({
      isFilled: ({ timePoint, time }) =>
        isFilled({
          mySchedule,
          weekday: timePoint,
          time,
        }),
      fillTimeBlocks: ({ timePoint, times, isFilling }) => {
        changeTimeBlock(timePoint, times, isFilling);
        setIsEdited(true);
      },
    });

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

    setMySchedule(newMySchedule);
  }

  function handleTimeBlockClick(weekday: string, time: string) {
    if (mode === 'view') return;
    _handleTimeBlockClick({ timePoint: weekday, time });
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
                  filled={isFilled({ mySchedule, weekday, time })}
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
