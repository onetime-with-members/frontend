import { forwardRef, useRef } from 'react';

import TimeBlock from './TimeBlock';
import useTimeBlockFill from '@/hooks/useTimeBlockFill';
import { Schedule, Time } from '@/types/schedule.type';
import { getBlockTimeList } from '@/utils/time-block';

export interface TimeBlockLineProps {
  timePoint: string;
  startTime: string;
  endTime: string;
  schedules: Schedule[];
  changeTimeBlockStatus: (
    day: Time['time_point'],
    time: Time['times'][0],
    newStatus: boolean,
  ) => void;
  handleDialogOpen: ({
    timePoint,
    time,
  }: {
    timePoint: string;
    time: string;
  }) => void;
  editable?: boolean;
  minWidth?: number;
  isPossibleTime?: boolean;
  backgroundColor: 'white' | 'gray';
  isBoardContentDragging?: boolean;
}

const TimeBlockLine = forwardRef<HTMLDivElement, TimeBlockLineProps>(
  (
    {
      timePoint,
      startTime,
      endTime,
      schedules,
      changeTimeBlockStatus,
      handleDialogOpen,
      editable,
      minWidth,
      isPossibleTime = true,
      backgroundColor,
      isBoardContentDragging,
    },
    ref,
  ) => {
    const blockRefList = useRef<HTMLDivElement[]>([]);

    const { clickedTimeBlock, handleTimeBlockClick } = useTimeBlockFill({
      isFilledFor: ({ time }) => isFilledFor(time),
      fillTimeBlocks: ({ timePoint, times, isFilling }) =>
        times.forEach((time) =>
          changeTimeBlockStatus(timePoint, time, isFilling),
        ),
    });

    const timeList = getBlockTimeList(startTime, endTime);
    const memberCount = schedules.length || 0;

    function timesAllMember() {
      let result: string[] = [];
      schedules.forEach((schedule) => {
        schedule.schedules.forEach((daySchedule) => {
          if (daySchedule.time_point === timePoint) {
            result = [...result, ...daySchedule.times];
          }
        });
      });
      return result;
    }

    function isFilledFor(time: Time['times'][0]) {
      return timesAllMember().includes(time);
    }

    function isClickedFirstFor(time: Time['times'][0]) {
      return clickedTimeBlock.startTime === time;
    }

    return (
      <div className="flex-1" ref={ref} style={{ minWidth }}>
        <div className="flex flex-col overflow-hidden rounded-lg">
          {timeList.map((time, index) => (
            <TimeBlock
              key={index}
              ref={(el) => {
                if (el) {
                  blockRefList.current[index] = el;
                }
              }}
              active={isFilledFor(time)}
              clickedFirst={isClickedFirstFor(time)}
              cursorPointer={schedules.length > 0}
              bgOpacity={
                timesAllMember().filter((t) => t === time).length / memberCount
              }
              onClick={
                !isBoardContentDragging
                  ? editable
                    ? () => handleTimeBlockClick({ timePoint, time })
                    : () => handleDialogOpen({ timePoint, time })
                  : undefined
              }
              editable={editable}
              isPossibleTime={isPossibleTime}
              isAllMembersAvailable={
                timesAllMember().filter((t) => t === time).length ===
                  memberCount && memberCount > 1
              }
              backgroundColor={backgroundColor}
            />
          ))}
        </div>
      </div>
    );
  },
);

export default TimeBlockLine;
