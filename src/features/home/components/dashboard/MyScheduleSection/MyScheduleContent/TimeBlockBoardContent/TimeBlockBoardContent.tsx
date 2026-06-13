import useTopContentHeight from '@/features/event/hooks/useTopContentHeight';
import { toStickyStyle } from '@/features/event/utils';
import { useMyScheduleQuery } from '@/features/my-schedule/api/my-schedule.query';
import MyTimeBlockBoard from '@/features/my-schedule/components/shared/MyTimeBlockBoard';
import { defaultMySchedule } from '@/features/my-schedule/constants';
import cn from '@/lib/cn';

export default function TimeBlockBoardContent() {
  const { data: mySchedule } = useMyScheduleQuery();

  const topContentHeight = useTopContentHeight(
    ({ navBar, dashboardHeader, barBanner }) =>
      navBar + dashboardHeader + barBanner,
  );

  const { className: topClassName, style: topStyle } =
    toStickyStyle(topContentHeight);

  return (
    <MyTimeBlockBoard
      mode="view"
      mySchedule={mySchedule || defaultMySchedule}
      className="pl-3 pr-6"
      topDateGroupClassName={cn('sticky bg-gray-00 z-10', topClassName)}
      topDateGroupStyle={topStyle}
    />
  );
}
