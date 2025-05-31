'use client';

import cn from '@/lib/cn';
import { useWeekdaysShort } from '@/stores/weekday';

export default function TopDateGroup({ className }: { className?: string }) {
  const weekdaysShort = useWeekdaysShort();

  return (
    <div className={cn('relative', className)}>
      <div className="grid grid-cols-7 gap-2 pl-6">
        {weekdaysShort.map((weekday) => (
          <div
            key={weekday}
            className="py-2 text-center text-gray-30 text-md-200"
          >
            {weekday}
          </div>
        ))}
      </div>
    </div>
  );
}
