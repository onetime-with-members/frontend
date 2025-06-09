import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import BottomButtonForDesktop from './BottomButtonForDesktop/BottomButtonForDesktop';
import TimeBlockBoard from '@/components/time-block-board/event';
import useScheduleAdd from '@/hooks/useScheduleAdd';
import useToast from '@/hooks/useToast';
import { EventType, ScheduleType } from '@/lib/types';

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
  const t = useTranslations('toast');

  const toast = useToast();
  const { isScheduleEmpty, isFixedScheduleEmpty, isSleepTimeEmpty } =
    useScheduleAdd({
      isNewGuest,
      guestId,
    });

  useEffect(() => {
    if (isScheduleEmpty && (!isFixedScheduleEmpty || !isSleepTimeEmpty)) {
      toast(t('loadedMySchedule'));
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
        isScheduleEmpty={isScheduleEmpty}
        isNewGuest={isNewGuest}
      />
      <BottomButtonForDesktop onClick={onSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
