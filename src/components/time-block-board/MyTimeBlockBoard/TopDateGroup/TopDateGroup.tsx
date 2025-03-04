import cn from '@/utils/cn';
import { weekdaysShort } from '@/utils/weekday';

interface TopDateGroupProps {
  className?: string;
}

export default function TopDateGroup({ className }: TopDateGroupProps) {
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
