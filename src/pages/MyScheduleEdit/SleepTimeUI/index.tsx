import SleepIcon from '@/components/icon/SleepIcon';
import { IconChevronDown } from '@tabler/icons-react';

export default function SleepTimeUI() {
  return (
    <div className="sticky top-[64px] z-10 flex h-[56px] cursor-pointer items-center justify-between bg-gray-05 px-5 py-4">
      <div className="flex items-center gap-1.5">
        <span>
          <SleepIcon fill="#5D6279" size={20} />
        </span>
        <span className="text-gray-80 text-md-300">수면 시간</span>
      </div>
      <div>
        <IconChevronDown size={24} className="text-gray-40" />
      </div>
    </div>
  );
}
