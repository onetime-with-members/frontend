import TimeBlock from './TimeBlock/TimeBlock';
import useSleepTime from '@/hooks/useSleepTime';
import useTimeBlockFill from '@/hooks/useTimeBlockFill';
import { MyScheduleTimeType } from '@/types/schedule.type';
import { SleepTimeType } from '@/types/user.type';
import { weekdaysShortKo } from '@/utils/weekday';

interface TimeBlockContentProps {
  mode: 'view' | 'edit';
  mySchedule: MyScheduleTimeType[];
  setMySchedule?: React.Dispatch<React.SetStateAction<MyScheduleTimeType[]>>;
  sleepTime?: SleepTimeType;
  backgroundColor?: 'gray' | 'white';
  setIsEdited?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BoardContent({
  mode,
  mySchedule,
  setMySchedule,
  sleepTime,
  backgroundColor = 'gray',
  setIsEdited,
}: TimeBlockContentProps) {
  const { handleTimeBlockClick: _handleTimeBlockClick, isClickedFirst } =
    useTimeBlockFill({
      isFilled,
      fillTimeBlocks: ({ timePoint, times, isFilling }) => {
        changeTimeBlock(timePoint, times, isFilling);
        setIsEdited?.(true);
      },
    });
  const { timesGroupForSplittedTimeBlock } = useSleepTime({
    sleepTime,
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
          {timesGroupForSplittedTimeBlock('timeBlock').map(
            (timesGroup, index) => (
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
            ),
          )}
        </div>
      ))}
    </div>
  );
}
