'use client';

import MyTimeBlockBoard from '../../shared/MyTimeBlockBoard';
import useMyScheduleTopContentHeight from '@/features/event/hooks/useMyScheduleTopContentHeight';
import { useMyScheduleQuery } from '@/features/my-schedule/api/my-schedule.query';
import { defaultMySchedule } from '@/features/my-schedule/constants';

export default function TimeBlockBoardSection() {
  const stickyTop = useMyScheduleTopContentHeight(
    ({ navBar, header, sleepTime }) => navBar + header + sleepTime,
  );

  const { data: mySchedule } = useMyScheduleQuery();

  return (
    <section>
      <MyTimeBlockBoard
        mode="view"
        backgroundColor="white"
        mySchedule={mySchedule || defaultMySchedule}
        className="bg-gray-00 pb-16 pl-2 pr-3"
        topDateGroupClassName="sticky z-10 bg-gray-00"
        topDateGroupStyle={{
          top: stickyTop,
        }}
      />
    </section>
  );
}
