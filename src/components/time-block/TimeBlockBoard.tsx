import TBDayLine from './TBDayLine';
import TBLeftLabelLine from './TBLeftLabelLine';
import { IconTriangleFilled } from '@tabler/icons-react';

export default function TimeBlockBoard() {
  const startHour = 9;
  const endHour = 24;

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="title-sm-300 text-gray-90">가능한 스케줄</h2>
        <div className="flex items-center gap-8">
          <IconTriangleFilled size={12} className="-rotate-90 text-gray-90" />
          <IconTriangleFilled size={12} className="rotate-90 text-gray-90" />
        </div>
      </div>
      <div className="mt-3 flex gap-3">
        <TBLeftLabelLine startHour={startHour} endHour={endHour} />
        <div className="flex w-full gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <TBDayLine
              key={index}
              weekDayIndex={index}
              startHour={startHour}
              endHour={endHour}
            />
          ))}
        </div>
      </div>
    </>
  );
}
