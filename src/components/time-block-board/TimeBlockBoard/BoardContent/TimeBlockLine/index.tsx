import { forwardRef } from 'react';

import TimeBlock from './TimeBlock';
import useTimeBlockFill from '@/hooks/useTimeBlockFill';
import { Schedule, Time } from '@/types/schedule.type';
import cn from '@/utils/cn';
import { eventTarget } from '@/utils/event-target';
import { timeBlockList } from '@/utils/time-block';

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
    const { clickedTimeBlock, handleTimeBlockClick: _handleTimeBlockClick } =
      useTimeBlockFill({
        isFilled: (_, time) => isFilled(time),
        fillTimeBlocks: ({ timePoint, times, isFilling }) =>
          times.forEach((time) =>
            changeTimeBlockStatus(timePoint, time, isFilling),
          ),
      });

    const timeList = timeBlockList(startTime, endTime);
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

    function isFilled(time: Time['times'][0]) {
      return timesAllMember().includes(time);
    }

    function isClickedFirstFor(time: Time['times'][0]) {
      return (
        clickedTimeBlock.startTime === time &&
        clickedTimeBlock.timePoint === timePoint
      );
    }

    function handleTimeBlockClick(event: React.MouseEvent | React.TouchEvent) {
      if (isBoardContentDragging) return;
      const target = eventTarget(event);
      if (!target) return;
      const timePoint = target.dataset.timepoint;
      const time = target.dataset.time;
      if (!timePoint || !time) return;
      if (editable) {
        _handleTimeBlockClick({ timePoint, time });
      } else {
        handleDialogOpen({ timePoint, time });
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
              active={isFilled(time)}
              data-time={time}
              data-timepoint={timePoint}
              clickedFirst={isClickedFirstFor(time)}
              bgOpacity={
                timesAllMember().filter((t) => t === time).length / memberCount
              }
              editable={editable}
              isPossibleTime={isPossibleTime}
              isAllMembersAvailable={
                timesAllMember().filter((t) => t === time).length ===
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
