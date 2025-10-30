import { useContext } from 'react';

import MyTimeBlockBoard from '@/components/time-block-board/my-schedule';
import { BarBannerContext } from '@/features/banner/contexts/BarBannerContext';
import { useMyScheduleQuery } from '@/features/my-schedule/api/my-schedule.query';
import { defaultMySchedule } from '@/features/my-schedule/constants';
import cn from '@/lib/cn';

export default function TimeBlockBoardContent() {
  const { isBarBannerShown } = useContext(BarBannerContext);

  const { data: mySchedule } = useMyScheduleQuery();

  return (
    <MyTimeBlockBoard
      mode="view"
      mySchedule={mySchedule || defaultMySchedule}
      className="pl-3 pr-6"
      topDateGroupClassName={cn(
        'sticky bg-gray-00 z-10 top-[64px] md:top-[136px]',
        {
          'top-[120px] md:top-[192px]': isBarBannerShown,
        },
      )}
    />
  );
}
