import { useSelector } from 'react-redux';

import SleepIcon from '@/components/icon/SleepIcon';
import { RootState } from '@/store';

export default function SleepTimeUI() {
  const { sleepTime } = useSelector((state: RootState) => state.sleepTime);

  return (
    <div className="sticky top-[64px] z-10 flex h-[56px] items-center gap-1.5 rounded-t-2xl bg-primary-00 px-5 py-4 md:top-[122px]">
      <span>
        <SleepIcon fill="#4C65E5" size={20} />
      </span>
      <span className="text-primary-50 text-md-300">
        {sleepTime.start} - {sleepTime.end}
      </span>
    </div>
  );
}
