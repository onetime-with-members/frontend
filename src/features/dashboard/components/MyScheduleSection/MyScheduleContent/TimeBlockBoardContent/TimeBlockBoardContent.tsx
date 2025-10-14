import { useContext } from 'react';

import MyTimeBlockBoard from '@/components/time-block-board/my-schedule';
import { BarBannerContext } from '@/contexts/bar-banner';
import cn from '@/lib/cn';
import { MyScheduleTimeType } from '@/lib/types';

export default function TimeBlockBoardContent({
  mySchedule,
}: {
  mySchedule: MyScheduleTimeType[];
}) {
  const { isBarBannerShown } = useContext(BarBannerContext);

  return (
    <MyTimeBlockBoard
      mode="view"
      mySchedule={mySchedule || []}
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
