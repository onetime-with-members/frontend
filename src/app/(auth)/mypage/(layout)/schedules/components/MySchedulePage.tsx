'use client';

import SleepTimeUI from './SleepTimeUI/SleepTimeUI';
import MyTimeBlockBoard from '@/components/time-block-board/MyTimeBlockBoard/MyTimeBlockBoard';
import { MyScheduleTimeType } from '@/lib/types';
import axios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

export default function MySchedulePage() {
  const { data } = useQuery<MyScheduleTimeType[]>({
    queryKey: ['fixed-schedules'],
    queryFn: async () => {
      const res = await axios.get('/fixed-schedules');
      return res.data.payload.schedules;
    },
  });

  return (
    <div className="mx-auto w-full max-w-screen-md pb-32">
      <SleepTimeUI />
      <MyTimeBlockBoard
        mode="view"
        backgroundColor="white"
        mySchedule={data || []}
        className="bg-gray-05 pb-16 pl-2 pr-3"
        topDateGroupClassName="sticky z-10 bg-gray-05 top-[120px] md:top-[178px]"
      />
    </div>
  );
}
