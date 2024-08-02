import clsx from 'clsx';

interface ScheduleTimeLabelLineProps {
  startHour: number;
  endHour: number;
}

export default function TBLeftLabelLine({
  startHour,
  endHour,
}: ScheduleTimeLabelLineProps) {
  const hourRange = endHour - startHour;

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-md-200 text-center text-gray-30 opacity-0">-</span>
      <div className="flex flex-col">
        {Array.from({ length: hourRange }, (_, index) => index + startHour).map(
          (hour, index) => (
            <div key={hour}>
              <div className="flex h-[2rem] items-start">
                <span
                  className={clsx('text-sm-200 text-gray-30', {
                    '-translate-y-1/2': index !== 0,
                  })}
                >
                  {hour.toString().padStart(2, '0')}:00
                </span>
              </div>
              <div className="flex h-[2rem] items-end">
                {index === hourRange - 1 && (
                  <span className="text-sm-200 text-gray-30">
                    {(hour + 1).toString().padStart(2, '0')}:00
                  </span>
                )}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
