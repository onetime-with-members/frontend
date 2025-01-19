import { forwardRef, useEffect, useRef, useState } from 'react';

import { Schedule, Time, TimeBlockDragIndex } from '../../types/schedule.type';
import { getBlockTimeList } from '../../utils/time-block';
import TBItem from './TBItem';

interface TBDayLineProps {
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
}

const TBDayLine = forwardRef<HTMLDivElement, TBDayLineProps>(
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
    },
    ref,
  ) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isFilling, setIsFilling] = useState(false);
    const [timeBlockDragIndex, setTimeBlockDragIndex] =
      useState<TimeBlockDragIndex>({
        start: -1,
        end: -1,
        min: -1,
        max: -1,
        totalMin: -1,
        totalMax: -1,
      });

    const blockRefList = useRef<HTMLDivElement[]>([]);

    const timeList = getBlockTimeList(startTime, endTime);

    const timesAllMember = getTimesAllMember(timePoint);

    const memberCount = schedules.length || 0;

    function dragStart(time: Time['times'][0], index: number) {
      setIsFilling(!timesAllMember.includes(time));
      setIsDragging(true);
      setTimeBlockDragIndex((prev) => ({
        ...prev,
        start: index,
        end: index,
        totalMin: index,
      }));
    }

    function handleMouseStart(time: Time['times'][0], index: number) {
      dragStart(time, index);
    }

    function handleTouchStart(time: Time['times'][0], index: number) {
      dragStart(time, index);
    }

    function dragEnd() {
      setIsDragging(false);
      setIsFilling(false);
      setTimeBlockDragIndex({
        start: -1,
        end: -1,
        min: -1,
        max: -1,
        totalMin: -1,
        totalMax: -1,
      });
    }

    function handleMouseEnd() {
      dragEnd();
    }

    function handleTouchEnd() {
      dragEnd();
    }

    function getTimesAllMember(timePoint: string) {
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

    function getTimeBlockActive(time: Time['times'][0]) {
      return timesAllMember.includes(time);
    }

    useEffect(() => {
      function dragMove(clientX: number, clientY: number) {
        blockRefList.current.forEach((block, index) => {
          if (document.elementFromPoint(clientX, clientY) === block) {
            setTimeBlockDragIndex((prev) => ({
              ...prev,
              end: index,
            }));
          }
        });
      }

      const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
          dragMove(e.clientX, e.clientY);
        }
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (isDragging) {
          const touchedElement = document.elementFromPoint(
            e.touches[0].clientX,
            e.touches[0].clientY,
          );

          const isInsideBlock = blockRefList.current.some(
            (block) => block === touchedElement,
          );

          if (isInsideBlock) {
            e.preventDefault();
          }

          dragMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove, {
        passive: false,
      });

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('touchmove', handleTouchMove);
      };
    }, [isDragging]);

    useEffect(() => {
      if (timeBlockDragIndex.start === -1 || timeBlockDragIndex.end === -1)
        return;

      const [minIndex, maxIndex] = [
        timeBlockDragIndex.start,
        timeBlockDragIndex.end,
      ].sort((a, b) => a - b);
      const totalMinIndex =
        minIndex < timeBlockDragIndex.totalMin
          ? minIndex
          : timeBlockDragIndex.totalMin;
      const totalMaxIndex =
        maxIndex > timeBlockDragIndex.totalMax
          ? maxIndex
          : timeBlockDragIndex.totalMax;

      setTimeBlockDragIndex((prev) => ({
        ...prev,
        min: minIndex,
        max: maxIndex,
        totalMin: totalMinIndex,
        totalMax: totalMaxIndex,
      }));
    }, [timeBlockDragIndex.start, timeBlockDragIndex.end]);

    useEffect(() => {
      if (
        timeBlockDragIndex.min === -1 ||
        timeBlockDragIndex.max === -1 ||
        timeBlockDragIndex.totalMin === -1 ||
        timeBlockDragIndex.totalMax === -1
      )
        return;

      if (isFilling) {
        blockRefList.current.forEach((_, index) => {
          if (
            index >= timeBlockDragIndex.totalMin &&
            index <= timeBlockDragIndex.totalMax
          ) {
            if (
              index >= timeBlockDragIndex.min &&
              index <= timeBlockDragIndex.max
            ) {
              changeTimeBlockStatus(timePoint, timeList[index], isFilling);
            } else {
              changeTimeBlockStatus(timePoint, timeList[index], !isFilling);
            }
          }
        });
      } else {
        blockRefList.current.forEach((_, index) => {
          if (
            index >= timeBlockDragIndex.min &&
            index <= timeBlockDragIndex.max
          ) {
            changeTimeBlockStatus(timePoint, timeList[index], isFilling);
          }
        });
      }
    }, [
      timeBlockDragIndex.min,
      timeBlockDragIndex.max,
      timeBlockDragIndex.totalMin,
      timeBlockDragIndex.totalMax,
    ]);

    return (
      <div className="flex-1" ref={ref} style={{ minWidth }}>
        <div
          className="flex flex-col overflow-hidden rounded-lg"
          onMouseUp={handleMouseEnd}
          onMouseLeave={handleMouseEnd}
          onTouchEnd={handleTouchEnd}
        >
          {timeList.map((time, index) => (
            <TBItem
              key={index}
              ref={(el) => {
                if (el) {
                  blockRefList.current[index] = el;
                }
              }}
              active={getTimeBlockActive(time)}
              cursorPointer={schedules.length > 0}
              bgOpacity={
                timesAllMember.filter((t) => t === time).length / memberCount
              }
              onMouseDown={
                editable ? () => handleMouseStart(time, index) : undefined
              }
              onTouchStart={
                editable ? () => handleTouchStart(time, index) : undefined
              }
              onClick={
                !editable
                  ? () => handleDialogOpen({ timePoint, time })
                  : undefined
              }
              editable={editable}
              isPossibleTime={isPossibleTime}
              isAllMembersAvailable={
                timesAllMember.filter((t) => t === time).length ===
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

export default TBDayLine;
