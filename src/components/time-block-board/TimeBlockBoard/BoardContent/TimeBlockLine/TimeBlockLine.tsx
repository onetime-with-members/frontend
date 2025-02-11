import { forwardRef } from 'react';

import TimeBlock from './TimeBlock/TimeBlock';
import { ScheduleType } from '@/types/schedule.type';
import cn from '@/utils/cn';
import { eventTarget } from '@/utils/event-target';
import { timeBlockList } from '@/utils/time-block';

export interface TimeBlockLineProps {
  timePoint: string;
  startTime: string;
  endTime: string;
  schedules: ScheduleType[];
  onTimeBlockClick: ({
    timePoint,
    time,
  }: {
    timePoint: string;
    time: string;
  }) => void;
  onDialogOpen: ({
    timePoint,
    time,
  }: {
    timePoint: string;
    time: string;
  }) => void;
  isFilled: (timePoint: string, time: string) => boolean;
  isClickedFirstFor: (timePoint: string, time: string) => boolean;
  timesAllMember: (timePoint: string) => string[];
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
      onTimeBlockClick,
      onDialogOpen,
      isFilled,
      isClickedFirstFor,
      timesAllMember,
      editable,
      minWidth,
      isPossibleTime = true,
      backgroundColor,
      isBoardContentDragging,
    },
    ref,
  ) => {
    const timeList = timeBlockList(startTime, endTime);
    const memberCount = schedules.length || 0;

    function handleTimeBlockClick(event: React.MouseEvent | React.TouchEvent) {
      if (isBoardContentDragging) return;
      const target = eventTarget(event);
      if (!target) return;
      const timePoint = target.dataset.timepoint;
      const time = target.dataset.time;
      if (!timePoint || !time) return;
      if (editable) {
        onTimeBlockClick({ timePoint, time });
      } else {
        onDialogOpen({ timePoint, time });
      }
    }

    return (
      <div className="flex-1" ref={ref} style={{ minWidth }}>
        <div className="flex flex-col overflow-hidden rounded-lg">
          {timeList.map((time, index) => (
            <TimeBlock
              key={index}
              className={cn({
                'cursor-pointer': schedules.length > 0,
              })}
              active={isFilled(timePoint, time)}
              data-time={time}
              data-timepoint={timePoint}
              clickedFirst={isClickedFirstFor(timePoint, time)}
              bgOpacity={
                timesAllMember(timePoint).filter((t) => t === time).length /
                memberCount
              }
              editable={editable}
              isPossibleTime={isPossibleTime}
              isAllMembersAvailable={
                timesAllMember(timePoint).filter((t) => t === time).length ===
                  memberCount && memberCount > 1
              }
              backgroundColor={backgroundColor}
              onClick={handleTimeBlockClick}
            />
          ))}
        </div>
      </div>
    );
  },
);

export default TimeBlockLine;
