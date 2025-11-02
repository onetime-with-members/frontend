import MyScheduleSkeleton from './MyScheduleSkeleton';
import SleepTimeContent from './SleepTimeContent';
import TimeBlockBoardContent from './TimeBlockBoardContent';
import {
  useMyScheduleQuery,
  useSleepTimeQuery,
} from '@/features/my-schedule/api/my-schedule.query';
import EverytimeUI from '@/features/my-schedule/components/shared/EverytimeUI';

export default function MyScheduleContent() {
  const { isPending: isMySchedulePending } = useMyScheduleQuery();
  const { isPending: isSleepTimePending } = useSleepTimeQuery();

  if (isMySchedulePending || isSleepTimePending) {
    return <MyScheduleSkeleton />;
  }

  return (
    <div className="rounded-2xl bg-gray-00 pb-12">
      <EverytimeUI className="rounded-t-2xl px-6" />
      <SleepTimeContent />
      <TimeBlockBoardContent />
    </div>
  );
}
