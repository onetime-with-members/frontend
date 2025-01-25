import { forwardRef } from 'react';

import TimeBlock from './TimeBlock';
import useLongPress from '@/hooks/useLongPress';
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
    const { clickedTimeBlock, handleTimeBlockClick: _handleTimeBlockClick } =
      useTimeBlockFill({
        isFilledFor: ({ time }) => isFilledFor(time),
        fillTimeBlocks: ({ timePoint, times, isFilling }) =>
          times.forEach((time) =>
            changeTimeBlockStatus(timePoint, time, isFilling),
          ),
      });
    const { handleLongPressStart, handleLongPressEnd } = useLongPress({
      onClick: (event) => handleTimeBlockClick(event),
      onLongPressStart: () => {
        console.log('long press start');
      },
      onLongPressEnd: () => {
        console.log('long press end');
      },
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

    function handleTimeBlockClick(event: React.MouseEvent | React.TouchEvent) {
      if (isBoardContentDragging) return;
      const target = event.currentTarget as HTMLDivElement;
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
              active={isFilledFor(time)}
              data-time={time}
              data-timepoint={timePoint}
              clickedFirst={isClickedFirstFor(time)}
              cursorPointer={schedules.length > 0}
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
              onMouseDown={handleLongPressStart}
              onMouseUp={handleLongPressEnd}
              onMouseLeave={handleLongPressEnd}
              onTouchStart={handleLongPressStart}
              onTouchEnd={handleLongPressEnd}
            />
          ))}
        </div>
      </div>
    );
  },
);

export default TimeBlockLine;
