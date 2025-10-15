import { useContext, useState } from 'react';

import SleepTimeAccordion from './SleepTimeAccordion';
import EverytimeUI from '@/components/everytime-ui';
import MyTimeBlockBoard from '@/components/time-block-board/my-schedule';
import { SleepTimeContext } from '@/contexts/sleep-time';
import useMyScheduleTimeBlock from '@/features/my-schedule/hooks/useMyScheduleTimeBlock';
import cn from '@/lib/cn';

export default function FormContent() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

  const { sleepTime, setSleepTime } = useContext(SleepTimeContext);

  const { mySchedule, setMySchedule, setIsMyScheduleEdited } =
    useMyScheduleTimeBlock();

  return (
    <form className="mx-auto max-w-screen-sm">
      <EverytimeUI className="sticky top-[64px] z-20 rounded-t-2xl" />
      <SleepTimeAccordion
        sleepTime={sleepTime}
        setSleepTime={setSleepTime}
        isAccordionOpen={isAccordionOpen}
        setIsAccordionOpen={setIsAccordionOpen}
      />
      <MyTimeBlockBoard
        mode="edit"
        mySchedule={mySchedule}
        setMySchedule={setMySchedule}
        className="pb-16 pl-2 pr-3"
        topDateGroupClassName={cn('sticky top-[176px] z-10 bg-gray-00', {
          'top-[239px] ': isAccordionOpen,
        })}
        setIsEdited={setIsMyScheduleEdited}
      />
    </form>
  );
}
