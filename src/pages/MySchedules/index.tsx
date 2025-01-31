import { useRef } from 'react';

import MyTimeBlockBoard from '@/components/time-block-board/MyTimeBlockBoard';
import mySchedulesDefault from '@/data/ts/my-schedules';

export default function MySchedules() {
  const desktopInnerContentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mx-auto w-full max-w-screen-md pb-32">
      <div ref={desktopInnerContentRef}>
        <MyTimeBlockBoard
          mode="view"
          mySchedules={mySchedulesDefault}
          topDateGroupClassName="sticky z-10 bg-gray-00 top-[64px] md:top-[122px]"
        />
      </div>
    </div>
  );
}
