import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

import { Schedule } from '../../types/schedule.type';
import TBItem from './TBItem';

interface ScheduleLineProps {
  weekday: string;
  startTime: string;
  endTime: string;
  times: Schedule['time'];
  handleTimeBlockClick: (
    day: Schedule['day'],
    time: Schedule['time'][0],
    newStatus: boolean,
  ) => void;
}

export default function TBDayLine({
  weekday,
  startTime,
  endTime,
  times,
  handleTimeBlockClick: handleTimeBlockClick,
}: ScheduleLineProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isFilling, setIsFilling] = useState(false);
  const [startIndex, setStartIndex] = useState(-1);
  const [endIndex, setEndIndex] = useState(-1);
  const [minIndex, setMinIndex] = useState(-1);
  const [maxIndex, setMaxIndex] = useState(-1);
  const [totalMinIndex, setTotalMinIndex] = useState(-1);
  const [totalMaxIndex, setTotalMaxIndex] = useState(-1);

  const blockRefs = useRef<HTMLDivElement[]>([]);

  const blockCount =
    dayjs(endTime, 'HH:mm').diff(dayjs(startTime, 'HH:mm'), 'hour') * 2;

  const timeList = Array.from({ length: blockCount }, (_, i) =>
    dayjs(startTime, 'HH:mm')
      .add(i * 30, 'minute')
      .format('HH:mm'),
  );

  function handleMouseStart(time: Schedule['time'][0], index: number) {
    setIsFilling(!times.includes(time));
    setIsDragging(true);
    setStartIndex(index);
    setEndIndex(index);
    setTotalMinIndex(index);
  }

  function handleTouchStart(time: Schedule['time'][0], index: number) {
    document.body.style.overflow = 'hidden';
    handleMouseStart(time, index);
  }

  function handleMouseEnd() {
    setIsDragging(false);
    setIsFilling(false);
    setStartIndex(-1);
    setEndIndex(-1);
    setMinIndex(-1);
    setMaxIndex(-1);
    setTotalMinIndex(-1);
    setTotalMaxIndex(-1);
  }

  function handleTouchEnd() {
    document.body.style.overflow = 'auto';
    handleMouseEnd();
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        blockRefs.current.forEach((block, index) => {
          if (document.elementFromPoint(e.clientX, e.clientY) === block) {
            setEndIndex(index);
          }
        });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        blockRefs.current.forEach((block, index) => {
          if (
            document.elementFromPoint(
              e.touches[0].clientX,
              e.touches[0].clientY,
            ) === block
          ) {
            setEndIndex(index);
          }
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging]);

  useEffect(() => {
    if (startIndex === -1 || endIndex === -1) return;

    const [minIndex, maxIndex] = [startIndex, endIndex].sort((a, b) => a - b);

    setMinIndex(minIndex);
    setMaxIndex(maxIndex);
    setTotalMaxIndex(maxIndex > totalMaxIndex ? maxIndex : totalMaxIndex);
    setTotalMinIndex(minIndex < totalMinIndex ? minIndex : totalMinIndex);
  }, [startIndex, endIndex]);

  useEffect(() => {
    if (
      minIndex === -1 ||
      maxIndex === -1 ||
      totalMinIndex === -1 ||
      totalMaxIndex === -1
    )
      return;

    if (isFilling) {
      blockRefs.current.forEach((_, index) => {
        if (index >= totalMinIndex && index <= totalMaxIndex) {
          if (index >= minIndex && index <= maxIndex) {
            handleTimeBlockClick(weekday, timeList[index], isFilling);
          } else {
            handleTimeBlockClick(weekday, timeList[index], !isFilling);
          }
        }
      });
    } else {
      blockRefs.current.forEach((_, index) => {
        if (index >= minIndex && index <= maxIndex) {
          handleTimeBlockClick(weekday, timeList[index], isFilling);
        }
      });
    }
  }, [minIndex, maxIndex, totalMinIndex, totalMaxIndex]);

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
          />
        ))}
      </div>
    </div>
  );
}
