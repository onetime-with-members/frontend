'use client';

import SleepIcon from '@/components/icon/sleep';
import MyTimeBlockBoard from '@/components/time-block-board/my-schedule';
import {
  myScheduleQueryOptions,
  sleepTimeQueryOptions,
} from '@/lib/api/query-options';
import { defaultMySchedule } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

export default function MySchedulePage() {
  const { data: mySchedule } = useQuery({ ...myScheduleQueryOptions });
  const { data: sleepTime } = useQuery({
    ...sleepTimeQueryOptions,
  });

  return (
    <div className="mx-auto w-full max-w-screen-md pb-32">
      {/* Sleep Time */}
      <div className="sticky top-[64px] z-10 flex h-[56px] items-center gap-1.5 rounded-t-2xl bg-primary-00 px-5 py-4 md:top-[122px]">
        <span>
          <SleepIcon fill="#4C65E5" size={20} />
        </span>
        <span className="text-primary-50 text-md-300">
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
