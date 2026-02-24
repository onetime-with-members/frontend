'use client';

import { useContext } from 'react';

import {
  useConfirmEventMutation,
  useEditEventConfirmedTimeMutation,
  useEventQuery,
} from '../api/event.query';
import BottomButton from '../components/confirm/BottomButton';
import DesktopHeader from '../components/confirm/DesktopHeader';
import DesktopNavBar from '../components/confirm/DesktopNavBar';
import MobileHeader from '../components/confirm/MobileHeader';
import PickersSection from '../components/confirm/PickersSection';
import RecommendedTimesSection from '../components/confirm/RecommendedTimesSection';
import { SelectedDateTimeContext } from '../contexts/SelectedDateTimeContext';
import GrayBackground from '@/components/GrayBackground';
import { useRouter } from '@/i18n/navigation';
import { useProgressRouter } from '@/navigation';
import { useParams } from 'next/navigation';

export default function EventConfirmPage() {
  const { finalDateTime } = useContext(SelectedDateTimeContext);

  const progressRouter = useProgressRouter();
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);

  const { mutateAsync: confirmEvent } = useConfirmEventMutation();
  const { mutateAsync: editEventConfirmedTime } =
    useEditEventConfirmedTimeMutation();

  async function handleConfirm() {
    const data = {
      eventId: params.id,
      data: {
        start_date: finalDateTime.start.date,
        end_date: finalDateTime.end.date,
        start_time: finalDateTime.start.time,
        end_time: finalDateTime.end.time,
        selection_source: 'MANUAL' as const,
      },
    };

    if (event.confirmation) {
      await editEventConfirmedTime(data);
    } else {
      await confirmEvent(data);
    }

    progressRouter.back();
  }

  function handleBackButtonClick() {
    router.back();
  }

  const isDisabled =
    !finalDateTime.start.date ||
    !finalDateTime.start.time ||
    !finalDateTime.end.date ||
    !finalDateTime.end.time;

  return (
    <div className="flex flex-col bg-gray-00 md:bg-gray-05">
      <GrayBackground device="desktop" breakpoint="md" />
      <DesktopNavBar />
      <MobileHeader
        onBackButtonClick={handleBackButtonClick}
        onConfirm={handleConfirm}
        disabled={isDisabled}
      />
      <main className="flex flex-col items-center pb-10">
        <div className="mx-auto flex w-full max-w-[825px] flex-col items-center justify-center md:pt-6">
          <DesktopHeader onBackButtonClick={handleBackButtonClick} />
          <div className="flex w-full flex-col gap-8 rounded-3xl bg-gray-00 md:flex-row">
            <PickersSection />
            <RecommendedTimesSection />
          </div>
        </div>
        <BottomButton onClick={handleConfirm} disabled={isDisabled} />
      </main>
    </div>
  );
}
