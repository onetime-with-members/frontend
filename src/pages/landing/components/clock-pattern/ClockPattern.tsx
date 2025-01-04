import clsx from 'clsx';

import ClockPatternLine from './ClockPatternLine';

interface ClockPatternProps {
  className?: string;
}

export default function ClockPattern({ className }: ClockPatternProps) {
  return (
    <div
      className={clsx(
        'absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col gap-7',
        className,
      )}
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <ClockPatternLine key={index} shift={index % 2 === 0} />
      ))}
    </div>
  );
}
