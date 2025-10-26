'use client';

import MyTimeBlockBoard from '@/components/time-block-board/my-schedule';
import { useMyScheduleQuery } from '@/features/my-schedule/api/my-schedule.queries';
import { defaultMySchedule } from '@/features/my-schedule/constants';

export default function TimeBlockBoardSection() {
  const { data: mySchedule } = useMyScheduleQuery();

  return (
    <section>
      <MyTimeBlockBoard
        mode="view"
        backgroundColor="white"
        mySchedule={mySchedule || defaultMySchedule}
        className="bg-gray-05 pb-16 pl-2 pr-3"
        topDateGroupClassName="sticky z-10 bg-gray-05 top-[120px] md:top-[178px]"
      />
    </section>
  );
}
