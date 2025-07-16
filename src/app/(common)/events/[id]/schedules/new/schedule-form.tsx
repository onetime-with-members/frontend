import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { createPortal, useFormStatus } from 'react-dom';

import FloatingBottomButton from '@/components/button/floating-bottom-button';
import SmallButton from '@/components/button/small-button';
import TimeBlockBoard from '@/components/time-block-board/event';
import useToast from '@/hooks/useToast';
import {
  createNewMemberScheduleAction,
  updateScheduleAction,
} from '@/lib/api/actions';
import { eventQueryOptions } from '@/lib/api/query-options';
import { defaultEvent } from '@/lib/constants';
import { GuestValueType, ScheduleType } from '@/lib/types';
import { useProgressRouter } from '@/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function ScheduleFormSubScreen({
  scheduleValue,
  setScheduleValue,
  isScheduleEdited,
  setIsScheduleEdited,
  initialSchedule,
  emptyStatus,
  guestValue,
}: {
  scheduleValue: ScheduleType[];
  setScheduleValue: React.Dispatch<React.SetStateAction<ScheduleType[]>>;
  isScheduleEdited: boolean;
  setIsScheduleEdited: React.Dispatch<React.SetStateAction<boolean>>;
  initialSchedule: ScheduleType[];
  emptyStatus: {
    isScheduleEmpty: boolean;
    isFixedScheduleEmpty: boolean;
    isSleepTimeEmpty: boolean;
  };
  guestValue: GuestValueType;
}) {
  const [isPossibleTime, setIsPossibleTime] = useState(true);

  const t = useTranslations();
  const queryClient = useQueryClient();
  const progressRouter = useProgressRouter();
  const params = useParams<{ id: string }>();

  const toast = useToast();

  const { data: event } = useQuery({
    ...eventQueryOptions(params.id),
  });

  const { mutateAsync: createNewMemberSchedule } = useMutation({
    mutationFn: createNewMemberScheduleAction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
      await queryClient.invalidateQueries({ queryKey: ['schedules'] });
      progressRouter.push(`/events/${params.id}`);
    },
  });
  const { mutateAsync: updateSchedule } = useMutation({
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
        event: event || defaultEvent,
        name: guestValue.name,
        pin: guestValue.pin,
        schedule: scheduleValue[0].schedules,
      });
    } else {
      await updateSchedule({
        event: event || defaultEvent,
        guestId: guestValue.guestId,
        schedule: scheduleValue[0].schedules,
      });
    }
  }

  useEffect(() => {
    const { isScheduleEmpty, isFixedScheduleEmpty, isSleepTimeEmpty } =
      emptyStatus;
    if (isScheduleEmpty && (!isFixedScheduleEmpty || !isSleepTimeEmpty)) {
      toast(t('toast.loadedMySchedule'));
    }
  }, [
    emptyStatus.isFixedScheduleEmpty,
    emptyStatus.isScheduleEmpty,
    emptyStatus.isSleepTimeEmpty,
  ]);

  return (
    <>
      {/* Form Content */}
      <form onSubmit={handleSubmit}>
        {/* Time Block Board */}
        <TimeBlockBoard
          schedules={scheduleValue}
          setSchedules={setScheduleValue}
          event={event || defaultEvent}
          isPossibleTime={isPossibleTime}
          setIsPossibleTime={setIsPossibleTime}
          editable
          topContentClassName="top-[69px] sm:top-[62px]"
          isEdited={isScheduleEdited}
          setIsEdited={setIsScheduleEdited}
          initialSchedule={initialSchedule}
          isScheduleEmpty={emptyStatus.isScheduleEmpty}
          isNewGuest={guestValue.isNewGuest}
        />
        {/* Bottom Submit Button for Desktop */}
        <div className="hidden sm:block">
          <BottomSubmitButton />
        </div>
      </form>

      {/* Top Submit Button */}
      <TopSubmitButton onClick={handleScheduleSubmit} />
    </>
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

function TopSubmitButton({ onClick }: { onClick: () => void }) {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null,
  );

  const t = useTranslations('scheduleAdd');

  useEffect(() => {
    setPortalContainer(document.getElementById('schedule-submit-button'));
  }, []);

  if (!portalContainer) {
    return null;
  }

  return createPortal(
    <div className="flex items-center justify-end">
      <SmallButton type="button" onClick={onClick}>
        {t('done')}
      </SmallButton>
    </div>,
    document.getElementById('schedule-submit-button') as HTMLElement,
  );
}
