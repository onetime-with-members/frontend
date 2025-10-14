import MyScheduleSkeleton from './MyScheduleSkeleton';
import SleepTimeContent from './SleepTimeContent';
import TimeBlockBoardContent from './TimeBlockBoardContent';
import EverytimeUI from '@/components/everytime-ui';
import {
  myScheduleQueryOptions,
  sleepTimeQueryOptions,
} from '@/lib/api/query-options';
import { defaultMySchedule } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

export default function MyScheduleContent() {
  const { data: mySchedule, isPending: isMySchedulePending } = useQuery({
    ...myScheduleQueryOptions,
  });
  const { isPending: isSleepTimePending } = useQuery({
    ...sleepTimeQueryOptions,
  });

  if (isMySchedulePending || isSleepTimePending) {
    return <MyScheduleSkeleton />;
  }

  return (
    <div className="rounded-2xl bg-gray-00 pb-12">
      <EverytimeUI className="rounded-t-2xl px-6" />
      <SleepTimeContent />
      <TimeBlockBoardContent mySchedule={mySchedule || defaultMySchedule} />
    </div>
  );
}
