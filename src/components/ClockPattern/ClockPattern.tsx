import cn from '@/lib/cn';
import Image from 'next/image';

export default function ClockPattern({
  className,
  gap = 28,
}: {
  className?: string;
  gap?: number;
}) {
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

function ClockPatternLine({ shift, gap }: { shift?: boolean; gap: number }) {
  return (
    <div
      className={cn('flex overflow-hidden', {
        'translate-x-[61px]': shift,
      })}
      style={{
        gap,
      }}
    >
      {Array.from({ length: 30 }).map((_, index) => (
        <div key={index} className="h-[92px] w-[102px] shrink-0 grow-0">
          <Image
            src="/images/clock-for-pattern.svg"
            alt="시계 그래픽 이미지"
            width={102}
            height={92}
            className="h-full w-full opacity-20"
          />
        </div>
      ))}
    </div>
  );
}
