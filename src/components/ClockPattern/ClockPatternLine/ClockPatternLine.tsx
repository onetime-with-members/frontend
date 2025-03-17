import cn from '@/utils/cn';
import Image from 'next/image';

interface ClockPatternLineProps {
  shift?: boolean;
  gap: number;
}

export default function ClockPatternLine({
  shift,
  gap,
}: ClockPatternLineProps) {
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
