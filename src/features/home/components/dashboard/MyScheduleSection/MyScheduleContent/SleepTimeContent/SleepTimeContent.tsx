import PenIcon from '@/components/icon/PenIcon';
import SleepIcon from '@/components/icon/SleepTimeIcon';
import { useSleepTimeQuery } from '@/features/my-schedule/api/my-schedule.query';
import { ProgressLink } from '@/navigation';

export default function SleepTimeContent() {
  const { data: sleepTime } = useSleepTimeQuery();

  return (
    <div className="flex items-stretch justify-between gap-3 px-6 py-3">
      <div className="flex items-center gap-1.5 text-gray-80">
        <span className="text-xl">
          <SleepIcon />
        </span>
        <span className="text-lg-200">
          {sleepTime?.sleep_start_time} - {sleepTime?.sleep_end_time}
        </span>
      </div>
      <ProgressLink
        href="/mypage/schedule/edit"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-05 text-2xl text-gray-70 duration-150 hover:bg-gray-10 active:bg-gray-10"
      >
        <PenIcon />
      </ProgressLink>
    </div>
  );
}
