import dayjs from 'dayjs';

import TBItem from './TBItem';

interface ScheduleLineProps {
  weekDayIndex: number;
  startHour: number;
  endHour: number;
}

export default function TBDayLine({
  weekDayIndex,
  startHour,
  endHour,
}: ScheduleLineProps) {
  const blockCount = (endHour - startHour) * 2;

  return (
    <div className="flex-1">
      <div className="text-center">
        <span className="text-md-200 text-gray-30">
          {dayjs.weekdaysMin()[weekDayIndex]}
        </span>
      </div>
      <div className="mt-2 flex flex-col overflow-hidden rounded-lg">
        {Array.from({ length: blockCount }).map((_, index) => (
          <TBItem key={index} />
        ))}
      </div>
    </div>
  );
}
