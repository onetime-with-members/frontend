import ClockPatternLine from './ClockPatternLine/ClockPatternLine';
import cn from '@/utils/cn';

interface ClockPatternProps {
  className?: string;
  gap?: number;
}

export default function ClockPattern({
  className,
  gap = 28,
}: ClockPatternProps) {
  return (
    <div
      className={cn(
        'absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col',
        className,
      )}
      style={{
        gap,
      }}
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <ClockPatternLine key={index} shift={index % 2 === 0} gap={gap} />
      ))}
    </div>
  );
}
