import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';

import BottomSubmitButton from './BottomSubmitButton';
import TopSubmitButton from './TopSubmitButton';
import TimeBlockBoard from '@/components/time-block-board/event';
import { useEventQuery } from '@/features/event/api/event.query';
import useGuestEditedEvents from '@/features/event/hooks/useIsEventEdited/useGuestEditedEvents';
import {
  useCreateNewMemberScheduleMutation,
  useUpdateScheduleMutation,
} from '@/features/schedule/api/schedule.query';
import { ScheduleFormContext } from '@/features/schedule/contexts/ScheduleFormContext';
import useScheduleAdd from '@/hooks/useScheduleAdd';
import useToast from '@/hooks/useToast';
import { useProgressRouter } from '@/navigation';
import { useParams } from 'next/navigation';

export default function ScheduleFormSubScreen({}) {
  const [isPossibleTime, setIsPossibleTime] = useState(true);

  const { guestValue, isScheduleEdited, setIsScheduleEdited, isLoggedIn } =
    useContext(ScheduleFormContext);

  const t = useTranslations();
  const progressRouter = useProgressRouter();
  const params = useParams<{ id: string }>();

  const toast = useToast();

  const { addNewEditedEvent } = useGuestEditedEvents();

  const {
    scheduleValue,
    setScheduleValue,
    initialSchedule,
    isScheduleEmpty,
    isFixedScheduleEmpty,
    isSleepTimeEmpty,
  } = useScheduleAdd({
    isLoggedIn,
    guestId: guestValue.guestId,
    eventId: params.id,
  });

  const { data: event } = useEventQuery(params.id);

  const { mutateAsync: createNewMemberSchedule, isPending: isCreatePending } =
    useCreateNewMemberScheduleMutation();
  const { mutateAsync: updateSchedule, isPending: isUpdatePending } =
    useUpdateScheduleMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await handleScheduleSubmit();
  }

  async function handleScheduleSubmit() {
    if (guestValue.isNewGuest) {
      await createNewMemberSchedule({
        event,
        name: guestValue.name,
        pin: guestValue.pin,
        schedule: scheduleValue[0].schedules,
      });
    } else {
      await updateSchedule({
        event,
        guestId: guestValue.guestId,
        schedule: scheduleValue[0].schedules,
      });
    }
    await addNewEditedEvent(params.id);
    progressRouter.push(`/events/${params.id}`);
  }

  useEffect(() => {
    if (isScheduleEmpty && (!isFixedScheduleEmpty || !isSleepTimeEmpty)) {
      toast(t('toast.loadedMySchedule'));
    }
  }, [isFixedScheduleEmpty, isScheduleEmpty, isSleepTimeEmpty]);

  return (
    <>
      <form onSubmit={handleSubmit}>
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
          isNewGuest={guestValue.isNewGuest}
        />
        <div className="hidden sm:block">
          <BottomSubmitButton />
        </div>
      </form>
      <TopSubmitButton
        onClick={handleScheduleSubmit}
        isPending={isCreatePending || isUpdatePending}
      />
    </>
  );
}
