import { CalendarIcon } from '@/components/icon';
import { IconChevronRight } from '@tabler/icons-react';

export default function FixTimeBanner() {
  return (
    <div className="flex cursor-pointer items-center gap-1.5 rounded-2xl bg-gray-70 px-4 py-3 text-gray-30 md:hidden">
      <span>
        <CalendarIcon innerfill="#474a5c" fontSize={20} />
      </span>
      <span className="flex-1 text-md-200">일정을 확정하고 공유해보세요</span>
      <span>
        <IconChevronRight size={24} />
      </span>
    </div>
  );
}
