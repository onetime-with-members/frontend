'use client';

import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import LeftPanel from './LeftPanel';
import ModalHeader from './ModalHeader';
import RightPanel from './RightPanel';
import { useScheduleConfirmState } from './hooks';
import EventFormTopNavBar from '@/features/event/components/form/EventForm/TopNavBar';
import Button from '@/components/button';
import GrayBackground from '@/components/GrayBackground';
import useIsMobile from '@/hooks/useIsMobile';
import cn from '@/lib/cn';
import { IconChevronLeft } from '@tabler/icons-react';

export default function ScheduleConfirmModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const t = useTranslations('event.components.ScheduleConfirmModal');
  const state = useScheduleConfirmState();
  const isMobile = useIsMobile();
  const [mobileStep, setMobileStep] = useState<'datetime' | 'recommended'>(
    'datetime',
  );

  const showCalendarSection = !isMobile || mobileStep === 'datetime';
  const handleLeftPanelConfirm = () => {
    if (isMobile && mobileStep === 'datetime') {
      setMobileStep('recommended');
    } else {
      onClose();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex flex-col bg-white md:bg-gray-05"
      role="dialog"
      aria-modal="true"
      aria-labelledby="schedule-confirm-title"
    >
      <GrayBackground device="desktop" breakpoint="md" />
      <div className="hidden md:block">
        <EventFormTopNavBar />
      </div>
      <ModalHeader
        onClose={onClose}
        isConfirmDisabled={state.isConfirmDisabled}
        onComplete={onClose}
      />

      <main className="flex flex-col items-center bg-gray-05">
        <div className="mx-auto flex w-full max-w-[825px] flex-col items-center justify-center md:pt-6">
          <div className="hidden w-full items-center justify-start gap-[2px] pb-6 md:flex">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center"
              aria-label={t('cancel')}
            >
              <IconChevronLeft size={32} />
            </button>
            <h1 className="text-gray-90 text-lg-300">일정 확정</h1>
          </div>
          <div className="flex w-full flex-col bg-white md:flex-row gap-8">
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
              onCancel={onClose}
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

        <div className="sticky bottom-0 left-0 hidden w-full md:mt-8 md:block md:static md:w-[25rem] md:bg-transparent">
          <Button
            type="button"
            variant="dark"
            fullWidth
            className={cn({
              'pointer-events-none cursor-default': state.isConfirmDisabled,
            })}
            disabled={state.isConfirmDisabled}
            onClick={() => !state.isConfirmDisabled && onClose()}
          >
            {t('confirmButton')}
          </Button>
        </div>
      </main>
    </div>,
    document.getElementById('pop-up') as HTMLElement,
  );
}
