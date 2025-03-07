import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import BottomButtonForDesktop from './BottomButtonForDesktop/BottomButtonForDesktop';
import TimeBlockBoard from '@/components/time-block-board/TimeBlockBoard/TimeBlockBoard';
import useScheduleAdd from '@/hooks/useScheduleAdd';
import { useToast } from '@/stores/toast';
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
  isNewGuest: boolean;
  guestId: string;
  initialSchedule: ScheduleType[];
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
  isNewGuest,
  guestId,
  initialSchedule,
}: ScheduleFormProps) {
  const { t } = useTranslation();

  const toast = useToast();
  const { isScheduleEmpty, isFixedScheduleEmpty, isSleepTimeEmpty } =
    useScheduleAdd({
      isNewGuest,
      guestId,
    });

  useEffect(() => {
    if (isScheduleEmpty && (!isFixedScheduleEmpty || !isSleepTimeEmpty)) {
      toast(t('toast.loadedMySchedule'));
    }
  }, [isScheduleEmpty, isFixedScheduleEmpty, isSleepTimeEmpty, toast, t]);

  return (
    <div>
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
        initialSchedule={initialSchedule}
      />
      <BottomButtonForDesktop onClick={onSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
