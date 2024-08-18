import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

import { Schedule } from '../../types/schedule.type';
import TBItem from './TBItem';

interface ScheduleLineProps {
  weekday: string;
  startTime: string;
  endTime: string;
  times: Schedule['time'];
  changeTimeBlockStatus: (
    day: Schedule['day'],
    time: Schedule['time'][0],
    newStatus: boolean,
  ) => void;
  handleDialogOpen: () => void;
  editable?: boolean;
}

export default function TBDayLine({
  weekday,
  startTime,
  endTime,
  times,
  changeTimeBlockStatus,
  handleDialogOpen,
  editable,
}: ScheduleLineProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isFilling, setIsFilling] = useState(false);
  const [dragIndex, setDragIndex] = useState<{
    start: number;
    end: number;
    min: number;
    max: number;
    totalMin: number;
    totalMax: number;
  }>({
    start: -1,
    end: -1,
    min: -1,
    max: -1,
    totalMin: -1,
    totalMax: -1,
  });

  const blockRefs = useRef<HTMLDivElement[]>([]);

  const blockCount =
    dayjs(endTime, 'HH:mm').diff(dayjs(startTime, 'HH:mm'), 'hour') * 2;

  const timeList = Array.from({ length: blockCount }, (_, i) =>
    dayjs(startTime, 'HH:mm')
      .add(i * 30, 'minute')
      .format('HH:mm'),
  );

  function dragStart(time: Schedule['time'][0], index: number) {
    setIsFilling(!times.includes(time));
    setIsDragging(true);
    setDragIndex((prev) => ({
      ...prev,
      start: index,
      end: index,
      totalMin: index,
    }));
  }

  function handleMouseStart(time: Schedule['time'][0], index: number) {
    if (!editable) return;
    dragStart(time, index);
  }

  function handleTouchStart(time: Schedule['time'][0], index: number) {
    if (!editable) return;
    dragStart(time, index);
  }

  function dragEnd() {
    setIsDragging(false);
    setIsFilling(false);
    setDragIndex({
      start: -1,
      end: -1,
      min: -1,
      max: -1,
      totalMin: -1,
      totalMax: -1,
    });
  }

  function handleMouseEnd() {
    if (!editable) return;
    dragEnd();
  }

  function handleTouchEnd() {
    if (!editable) return;
    dragEnd();
  }

  function handleTimeBlockDialogOpen() {
    if (editable) return;
    handleDialogOpen();
  }

  useEffect(() => {
    function dragMove(clientX: number, clientY: number) {
      blockRefs.current.forEach((block, index) => {
        if (document.elementFromPoint(clientX, clientY) === block) {
          setDragIndex((prev) => ({
            ...prev,
            end: index,
          }));
        }
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!editable) return;
      if (isDragging) {
        dragMove(e.clientX, e.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!editable) return;
      if (isDragging) {
        const touchedElement = document.elementFromPoint(
          e.touches[0].clientX,
          e.touches[0].clientY,
        );

        const isInsideBlock = blockRefs.current.some(
          (block) => block === touchedElement,
        );

        if (isInsideBlock) {
          e.preventDefault();
        }

        dragMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging]);

  useEffect(() => {
    if (dragIndex.start === -1 || dragIndex.end === -1) return;

    const [minIndex, maxIndex] = [dragIndex.start, dragIndex.end].sort(
      (a, b) => a - b,
    );
    const totalMinIndex =
      minIndex < dragIndex.totalMin ? minIndex : dragIndex.totalMin;
    const totalMaxIndex =
      maxIndex > dragIndex.totalMax ? maxIndex : dragIndex.totalMax;

    setDragIndex((prev) => ({
      ...prev,
      min: minIndex,
      max: maxIndex,
      totalMin: totalMinIndex,
      totalMax: totalMaxIndex,
    }));
  }, [dragIndex.start, dragIndex.end]);

  useEffect(() => {
    if (
      dragIndex.min === -1 ||
      dragIndex.max === -1 ||
      dragIndex.totalMin === -1 ||
      dragIndex.totalMax === -1
    )
      return;

    if (isFilling) {
      blockRefs.current.forEach((_, index) => {
        if (index >= dragIndex.totalMin && index <= dragIndex.totalMax) {
          if (index >= dragIndex.min && index <= dragIndex.max) {
            changeTimeBlockStatus(weekday, timeList[index], isFilling);
          } else {
            changeTimeBlockStatus(weekday, timeList[index], !isFilling);
          }
        }
      });
    } else {
      blockRefs.current.forEach((_, index) => {
        if (index >= dragIndex.min && index <= dragIndex.max) {
          changeTimeBlockStatus(weekday, timeList[index], isFilling);
        }
      });
    }
  }, [dragIndex.min, dragIndex.max, dragIndex.totalMin, dragIndex.totalMax]);

  return (
    <div className="flex-1">
      <div className="text-center">
        <span className="text-md-200 text-gray-30">{weekday}</span>
      </div>
      <div
        className="mt-2 flex flex-col overflow-hidden rounded-lg"
        onMouseUp={handleMouseEnd}
        onMouseLeave={handleMouseEnd}
        onTouchEnd={handleTouchEnd}
      >
        {timeList.map((time, index) => (
          <TBItem
            key={index}
            ref={(el) => {
              if (el) {
                blockRefs.current[index] = el;
              }
            }}
            active={times.includes(time)}
            onMouseDown={() => handleMouseStart(time, index)}
            onTouchStart={() => handleTouchStart(time, index)}
            onClick={handleTimeBlockDialogOpen}
          />
        ))}
      </div>
    </div>
  );
}
