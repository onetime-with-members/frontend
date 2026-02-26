'use client';

import BottomButton from './BottomButton';
import DesktopHeader from './DesktopHeader';
import DesktopNavBar from './DesktopNavBar';
import MobileHeader from './MobileHeader';
import PickersSection from './PickersSection';
import RecommendedTimesSection from './RecommendedTimesSection';
import {
  useConfirmEventMutation,
  useEditEventConfirmedTimeMutation,
  useEventQuery,
} from '@/features/event/api/event.query';
import { useConfirmedTime } from '@/features/event/contexts/ConfirmedTimeContext';
import { ConfirmEventRequestData } from '@/features/event/types';
import { parseDateTime, parseDayTime } from '@/features/event/utils';
import { useProgressRouter } from '@/navigation';
import { useParams } from 'next/navigation';

export default function PageContent() {
  const confirmedTime = useConfirmedTime();

  const params = useParams<{ id: string }>();

  const progressRouter = useProgressRouter();

  const { data: event } = useEventQuery(params.id);

  const { mutateAsync: confirmEvent } = useConfirmEventMutation();
  const { mutateAsync: editEventConfirmedTime } =
    useEditEventConfirmedTimeMutation();

  const isAllPickerSelected =
    confirmedTime.start.date &&
    confirmedTime.start.time &&
    confirmedTime.end.date &&
    confirmedTime.end.time;
  const isStartEndDateTimeValid = () => {
    const parse = event.category === 'DATE' ? parseDateTime : parseDayTime;
    const startDayjs = parse(
      confirmedTime.start.date,
      confirmedTime.start.time,
    );
    const endDayjs = parse(confirmedTime.end.date, confirmedTime.end.time);
    return startDayjs.isBefore(endDayjs) || startDayjs.isSame(endDayjs);
  };
  const isDisabled = !isAllPickerSelected || !isStartEndDateTimeValid();

  async function handleConfirm() {
    const request = {
      eventId: params.id,
      data: {
        [event.category === 'DATE' ? 'start_date' : 'start_day']:
          confirmedTime.start.date,
        [event.category === 'DATE' ? 'end_date' : 'end_day']:
          confirmedTime.end.date,
        start_time: confirmedTime.start.time,
        end_time: confirmedTime.end.time,
      } as ConfirmEventRequestData,
    };

    if (event.confirmation) {
      await editEventConfirmedTime(request);
    } else {
      await confirmEvent(request);
    }

    progressRouter.back();
  }

  function handleBackButtonClick() {
    progressRouter.back();
  }

  return (
    <>
      <DesktopNavBar />
      <MobileHeader
        onBackButtonClick={handleBackButtonClick}
        onConfirm={handleConfirm}
        disabled={isDisabled}
      />
      <main className="flex flex-col items-center pb-10">
        <div className="mx-auto flex w-full max-w-[825px] flex-col items-center justify-center md:pt-6">
          <DesktopHeader onBackButtonClick={handleBackButtonClick} />
          <div className="flex w-full flex-col gap-8 rounded-3xl md:flex-row">
            <PickersSection />
            <RecommendedTimesSection />
          </div>
        </div>
        <BottomButton onClick={handleConfirm} disabled={isDisabled} />
      </main>
    </>
  );
}
