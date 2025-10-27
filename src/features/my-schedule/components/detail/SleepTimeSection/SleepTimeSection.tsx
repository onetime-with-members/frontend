'use client';

import SleepIcon from '@/components/icon/SleepTimeIcon';
import { useSleepTimeQuery } from '@/features/my-schedule/api/my-schedule.queries';

export default function SleepTimeSection() {
  const { data: sleepTime } = useSleepTimeQuery();

  return (
    <section className="sticky top-[64px] z-10 flex h-[56px] items-center gap-1.5 rounded-t-2xl bg-primary-00 px-5 py-4 text-primary-50 md:top-[122px]">
      <span className="text-xl">
        <SleepIcon />
      </span>
      <span className="text-md-300">
        {sleepTime?.sleep_start_time} - {sleepTime?.sleep_end_time}
      </span>
    </section>
  );
}
