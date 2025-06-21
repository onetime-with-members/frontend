import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';

import FloatingBottomButton from '@/components/button/floating-bottom-button';
import TimeBlockBoard from '@/components/time-block-board/event';
import useToast from '@/hooks/useToast';
import { EventType, ScheduleType } from '@/lib/types';

export default function ScheduleFormSubScreen({
  event,
  scheduleValue,
  setScheduleValue,
  isScheduleEdited,
  setIsScheduleEdited,
  isNewGuest,
  initialSchedule,
  isScheduleEmpty,
  isFixedScheduleEmpty,
  isSleepTimeEmpty,
}: {
  event: EventType;
  scheduleValue: ScheduleType[];
  setScheduleValue: React.Dispatch<React.SetStateAction<ScheduleType[]>>;
  isScheduleEdited: boolean;
  setIsScheduleEdited: React.Dispatch<React.SetStateAction<boolean>>;
  isNewGuest: boolean;
  initialSchedule: ScheduleType[];
  isScheduleEmpty: boolean;
  isFixedScheduleEmpty: boolean;
  isSleepTimeEmpty: boolean;
}) {
  const [isPossibleTime, setIsPossibleTime] = useState(true);

  const t = useTranslations();

  const toast = useToast();

  useEffect(() => {
    if (isScheduleEmpty && (!isFixedScheduleEmpty || !isSleepTimeEmpty)) {
      toast(t('toast.loadedMySchedule'));
    }
  }, [isScheduleEmpty, isFixedScheduleEmpty, isSleepTimeEmpty]);

  return (
    <div>
      {/* Time Block Board */}
      <TimeBlockBoard
        schedules={scheduleValue}
        setSchedules={setScheduleValue}
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
      {/* Bottom Submit Button for Desktop */}
      <div className="hidden sm:block">
        <BottomSubmitButton />
      </div>
    </div>
  );
}

function BottomSubmitButton() {
  const { pending } = useFormStatus();

  const t = useTranslations('scheduleAdd');

  return (
    <FloatingBottomButton variant="dark" maxWidth={480}>
      {pending ? t('addingSchedule') : t('addSchedule')}
    </FloatingBottomButton>
  );
}
