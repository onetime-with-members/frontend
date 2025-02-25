import BottomButtonForDesktop from './BottomButtonForDesktop/BottomButtonForDesktop';
import TimeBlockBoard from '@/components/time-block-board/TimeBlockBoard/TimeBlockBoard';
import { EventType } from '@/types/event.type';
import { ScheduleType } from '@/types/schedule.type';

interface ScheduleFormProps {
  event: EventType;
  schedules: ScheduleType[];
  setSchedules: React.Dispatch<React.SetStateAction<ScheduleType[]>>;
  isPossibleTime: boolean;
  setIsPossibleTime: React.Dispatch<React.SetStateAction<boolean>>;
  isScheduleEdited: boolean;
  setIsScheduleEdited: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function ScheduleFormScreen({
  event,
  schedules,
  setSchedules,
  isPossibleTime,
  setIsPossibleTime,
  isScheduleEdited,
  setIsScheduleEdited,
  onSubmit,
  isSubmitting,
}: ScheduleFormProps) {
  return (
    <>
      <TimeBlockBoard
        schedules={schedules}
        setSchedules={setSchedules}
        event={event}
        isPossibleTime={isPossibleTime}
        setIsPossibleTime={setIsPossibleTime}
        editable
        topContentClassName="top-[69px] sm:top-[62px]"
        isEdited={isScheduleEdited}
        setIsEdited={setIsScheduleEdited}
      />
      <BottomButtonForDesktop onClick={onSubmit} isSubmitting={isSubmitting} />
    </>
  );
}
