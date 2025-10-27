import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';

import { ScheduleFormContext } from '../../../contexts/ScheduleFormContext';
import BottomSubmitButton from './BottomSubmitButton';
import TopSubmitButton from './TopSubmitButton';
import TimeBlockBoard from '@/components/time-block-board/event';
import { useEventQuery } from '@/features/event/api/events.query';
import useScheduleAdd from '@/hooks/useScheduleAdd';
import useToast from '@/hooks/useToast';
import {
  createNewMemberScheduleAction,
  updateScheduleAction,
} from '@/lib/api/actions';
import { useProgressRouter } from '@/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function ScheduleFormSubScreen({}) {
  const [isPossibleTime, setIsPossibleTime] = useState(true);

  const { guestValue, isScheduleEdited, setIsScheduleEdited, isLoggedIn } =
    useContext(ScheduleFormContext);

  const t = useTranslations();
  const queryClient = useQueryClient();
  const progressRouter = useProgressRouter();
  const params = useParams<{ id: string }>();

  const toast = useToast();

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
    useMutation({
      mutationFn: createNewMemberScheduleAction,
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['events'] });
        await queryClient.invalidateQueries({ queryKey: ['schedules'] });
        progressRouter.push(`/events/${params.id}`);
      },
    });
  const { mutateAsync: updateSchedule, isPending: isUpdatePending } =
    useMutation({
      mutationFn: updateScheduleAction,
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['events'] });
        await queryClient.invalidateQueries({ queryKey: ['schedules'] });
        progressRouter.push(`/events/${params.id}`);
      },
    });

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
