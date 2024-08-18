import dayjs from 'dayjs';
import { useState } from 'react';

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
  handleTimeBlockClick,
}: ScheduleLineProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isFilling, setIsFilling] = useState(false);

  const blockCount =
    (dayjs(endTime, 'HH:mm').hour() - dayjs(startTime, 'HH:mm').hour()) * 2;

  const timeList = Array.from({ length: blockCount }, (_, i) =>
    dayjs(startTime, 'HH:mm')
      .add(i * 30, 'minute')
      .format('HH:mm'),
  ).filter((time) => time <= endTime);

  function handleTimeBlockDragStart(time: Schedule['time'][0]) {
    handleTimeBlockClick(weekday, time, !times.includes(time));
    setIsFilling(!times.includes(time));
    setIsDragging(true);
  }

  function handleTimeBlockDragged(time: Schedule['time'][0]) {
    if (isDragging) handleTimeBlockClick(weekday, time, isFilling);
  }

  function handleTimeBlockDragEnd() {
    setIsDragging(false);
    setIsFilling(false);
  }

  return (
    <div className="flex-1">
      <div className="text-center">
        <span className="text-md-200 text-gray-30">{weekday}</span>
      </div>
      <div className="mt-2 flex flex-col overflow-hidden rounded-lg">
        {timeList.map((time, index) => (
          <TBItem
            key={index}
            active={times.includes(time)}
            onMouseDown={() => handleTimeBlockDragStart(time)}
            onMouseOver={() => handleTimeBlockDragged(time)}
            onMouseUp={() => handleTimeBlockDragEnd()}
          />
        ))}
      </div>
    </div>
  );
}
