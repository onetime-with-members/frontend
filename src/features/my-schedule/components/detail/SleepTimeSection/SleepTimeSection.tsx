'use client';

import { SleepTimeIcon } from '@/components/icon';
import useMyScheduleTopContentHeight from '@/features/event/hooks/useMyScheduleTopContentHeight';
import { useSleepTimeQuery } from '@/features/my-schedule/api/my-schedule.query';

export default function SleepTimeSection() {
  const stickyTop = useMyScheduleTopContentHeight(
    ({ navBar, header }) => navBar + header,
  );

  const { data: sleepTime } = useSleepTimeQuery();

  return (
    <section
      className="sticky z-10 flex h-[56px] items-center gap-1.5 rounded-t-2xl bg-primary-00 px-5 py-4 text-primary-50"
      style={{ top: stickyTop }}
    >
      <span className="text-xl">
        <SleepTimeIcon />
      </span>
      <span className="text-md-300">
        {sleepTime?.sleep_start_time} - {sleepTime?.sleep_end_time}
      </span>
    </section>
  );
}
