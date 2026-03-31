import useTopContentHeight from '@/features/event/hooks/useTopContentHeight';
import { useMyScheduleQuery } from '@/features/my-schedule/api/my-schedule.query';
import MyTimeBlockBoard from '@/features/my-schedule/components/shared/MyTimeBlockBoard';
import { defaultMySchedule } from '@/features/my-schedule/constants';

export default function TimeBlockBoardContent() {
  const { data: mySchedule } = useMyScheduleQuery();

  const topContentHeight = useTopContentHeight(
    ({ navBar, dashboardHeader, barBanner }) =>
      navBar + dashboardHeader + barBanner,
  );

  return (
    <MyTimeBlockBoard
      mode="view"
      mySchedule={mySchedule || defaultMySchedule}
      className="pl-3 pr-6"
      topDateGroupClassName="sticky bg-gray-00 z-10"
      topDateGroupStyle={{
        top: topContentHeight,
      }}
    />
  );
}
