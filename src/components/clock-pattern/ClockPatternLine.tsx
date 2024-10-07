import clsx from 'clsx';

import clockImageForPattern from '../../assets/landing/clock-for-pattern.svg';

interface ClockPatternLineProps {
  shift?: boolean;
}

export default function ClockPatternLine({ shift }: ClockPatternLineProps) {
  return (
    <div
      className={clsx('flex gap-7 overflow-hidden', {
        'translate-x-[61px]': shift,
      })}
    >
      {Array.from({ length: 30 }).map((_, index) => (
        <div key={index} className="h-[92px] w-[102px] shrink-0 grow-0">
          <img
            src={clockImageForPattern}
            alt="시계 그래픽 이미지"
            className="h-full w-full opacity-20"
          />
        </div>
      ))}
    </div>
  );
}
