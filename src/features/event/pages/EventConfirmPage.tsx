'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import LeftPanel from '../components/confirm/LeftPanel';
import ModalHeader from '../components/confirm/ModalHeader';
import RightPanel from '../components/confirm/RightPanel';
import { useScheduleConfirmState } from '../hooks/useScheduleConfirmState';
import GrayBackground from '@/components/GrayBackground';
import NavBar from '@/components/NavBar';
import Button from '@/components/button';
import useIsMobile from '@/hooks/useIsMobile';
import { useRouter } from '@/i18n/navigation';
import cn from '@/lib/cn';
import { IconChevronLeft } from '@tabler/icons-react';

export default function EventConfirmPage() {
  const [mobileStep, setMobileStep] = useState<'datetime' | 'recommended'>(
    'datetime',
  );

  const t = useTranslations('event.components.ScheduleConfirmModal');
  const router = useRouter();

  const state = useScheduleConfirmState();
  const isMobile = useIsMobile();

  const showCalendarSection = !isMobile || mobileStep === 'datetime';

  function handleClose() {
    router.back();
  }

  function handleLeftPanelConfirm() {
    if (isMobile && mobileStep === 'datetime') {
      setMobileStep('recommended');
    } else {
      handleClose();
    }
  }

  return (
    <div className="flex flex-col bg-gray-00 md:bg-gray-05">
      <GrayBackground device="desktop" breakpoint="md" />
      <div className="hidden md:block">
        <NavBar />
      </div>
      <ModalHeader
        onClose={handleClose}
        isConfirmDisabled={state.isConfirmDisabled}
        onComplete={handleClose}
      />
      <main className="flex flex-col items-center bg-gray-05">
        <div className="mx-auto flex w-full max-w-[825px] flex-col items-center justify-center md:pt-6">
          <div className="hidden w-full items-center justify-start gap-[2px] pb-6 md:flex">
            <button
              type="button"
              onClick={handleClose}
              className="flex items-center justify-center"
              aria-label={t('cancel')}
            >
              <IconChevronLeft size={32} />
            </button>
            <h1 className="text-gray-90 text-lg-300">일정 확정</h1>
          </div>
          <div className="flex w-full flex-col gap-8 bg-white md:flex-row">
            <LeftPanel
              eventTitle={state.event?.title ?? ''}
              focusedField={state.focusedField}
              onFocusChange={state.setFocusedField}
              selectedStartDate={state.selectedStartDate}
              selectedEndDate={state.selectedEndDate}
              startTime={state.startTime}
              endTime={state.endTime}
              calendarRanges={state.calendarRanges}
              onCalendarRangesChange={state.setCalendarRanges}
              onStartTimeChange={state.setStartTime}
              onEndTimeChange={state.setEndTime}
              isConfirmDisabled={state.isConfirmDisabled}
              onCancel={handleClose}
              onConfirm={handleLeftPanelConfirm}
              showCalendarSection={showCalendarSection}
            />
            {(!isMobile || mobileStep === 'recommended') && (
              <RightPanel
                recommendedTimes={state.recommendedTimes}
                selectedSlotIndex={state.selectedSlotIndex}
                onSelectSlot={state.handleSelectRecommended}
              />
            )}
          </div>
        </div>

        <div className="sticky bottom-0 left-0 hidden w-full md:static md:mt-8 md:block md:w-[25rem] md:bg-transparent">
          <Button
            type="button"
            variant="dark"
            fullWidth
            className={cn({
              'pointer-events-none cursor-default': state.isConfirmDisabled,
            })}
            disabled={state.isConfirmDisabled}
            onClick={() => !state.isConfirmDisabled && handleClose()}
          >
            {t('confirmButton')}
          </Button>
        </div>
      </main>
    </div>
  );
}
