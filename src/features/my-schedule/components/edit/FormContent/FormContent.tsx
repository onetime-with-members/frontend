import { useContext, useState } from 'react';

import EverytimeUI from '../../shared/EverytimeUI';
import MyTimeBlockBoard from '../../shared/MyTimeBlockBoard';
import SleepTimeAccordion from './SleepTimeAccordion';
import useMyScheduleEditTopContentHeight from '@/features/event/hooks/useMyScheduleEditTopContentHeight';
import { SleepTimeContext } from '@/features/my-schedule/contexts/SleepTimeContext';
import useMyScheduleTimeBlock from '@/features/my-schedule/hooks/useMyScheduleTimeBlock';

export default function FormContent() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

  const { sleepTime, setSleepTime } = useContext(SleepTimeContext);

  const { mySchedule, setMySchedule, setIsMyScheduleEdited } =
    useMyScheduleTimeBlock();
  const stickyTop = useMyScheduleEditTopContentHeight(
    { isAccordionOpen },
    ({ appBar, everytime, sleepTime }) => appBar + everytime + sleepTime,
  );

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
        topDateGroupClassName="sticky top-[176px] z-10 bg-gray-00"
        setIsEdited={setIsMyScheduleEdited}
        topDateGroupStyle={{
          top: stickyTop,
        }}
      />
    </form>
  );
}
