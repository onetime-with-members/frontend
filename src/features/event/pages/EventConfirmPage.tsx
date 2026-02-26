'use client';

import { useState } from 'react';

import { useEventQuery } from '../api/event.query';
import ActionConfirmModal from '../components/confirm/ActionConfirmModal';
import BottomButton from '../components/confirm/BottomButton';
import DesktopHeader from '../components/confirm/DesktopHeader';
import DesktopNavBar from '../components/confirm/DesktopNavBar';
import MobileHeader from '../components/confirm/MobileHeader';
import PickersSection from '../components/confirm/PickersSection';
import RecommendedTimesSection from '../components/confirm/RecommendedTimesSection';
import { useConfirmedTime } from '../contexts/ConfirmedTimeContext';
import { parseDateTime, parseDayTime } from '../utils';
import GrayBackground from '@/components/GrayBackground';
import { useProgressRouter } from '@/navigation';
import { useParams } from 'next/navigation';

export default function EventConfirmPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const confirmedTime = useConfirmedTime();

  const params = useParams<{ id: string }>();

  const progressRouter = useProgressRouter();

  const { data: event } = useEventQuery(params.id);

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

  function handleBackButtonClick() {
    progressRouter.back();
  }

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="flex flex-col bg-gray-00 md:bg-gray-05">
        <GrayBackground device="desktop" breakpoint="md" />
        <DesktopNavBar />
        <MobileHeader
          onBackButtonClick={handleBackButtonClick}
          onConfirm={handleModalOpen}
          disabled={isDisabled}
        />
        <main className="flex flex-col items-center pb-10">
          <div className="mx-auto flex w-full max-w-[908px] flex-col items-center justify-center md:pt-6">
            <DesktopHeader onBackButtonClick={handleBackButtonClick} />
            <div className="flex w-full flex-col gap-8 rounded-3xl md:max-h-[701px] md:flex-row">
              <PickersSection />
              <RecommendedTimesSection />
            </div>
          </div>
          <BottomButton onClick={handleModalOpen} disabled={isDisabled} />
        </main>
      </div>
      {isModalOpen && <ActionConfirmModal onCancel={handleModalClose} />}
    </>
  );
}
