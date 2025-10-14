'use client';

import SleepIcon from '@/components/icon/SleepTimeIcon';
import MyTimeBlockBoard from '@/components/time-block-board/my-schedule';
import {
  useMyScheduleQuery,
  useSleepTimeQuery,
} from '@/features/my-schedule/api';
import { defaultMySchedule } from '@/lib/constants';

export default function MySchedulePage() {
  const { data: mySchedule } = useMyScheduleQuery();
  const { data: sleepTime } = useSleepTimeQuery();

  return (
    <div className="mx-auto w-full max-w-screen-md pb-32">
      {/* Sleep Time */}
      <div className="sticky top-[64px] z-10 flex h-[56px] items-center gap-1.5 rounded-t-2xl bg-primary-00 px-5 py-4 text-primary-50 md:top-[122px]">
        <span className="text-xl">
          <SleepIcon />
        </span>
        <span className="text-md-300">
          {sleepTime?.sleep_start_time} - {sleepTime?.sleep_end_time}
        </span>
      </div>

      {/* Time Block Board */}
      <MyTimeBlockBoard
        mode="view"
        backgroundColor="white"
        mySchedule={mySchedule || defaultMySchedule}
        className="bg-gray-05 pb-16 pl-2 pr-3"
        topDateGroupClassName="sticky z-10 bg-gray-05 top-[120px] md:top-[178px]"
      />
    </div>
  );
}
