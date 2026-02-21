'use client';

import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';

import LeftPanel from './LeftPanel';
import ModalHeader from './ModalHeader';
import RightPanel from './RightPanel';
import { useScheduleConfirmState } from './hooks';
import EventFormTopNavBar from '@/features/event/components/form/EventForm/TopNavBar';
import Button from '@/components/button';
import GrayBackground from '@/components/GrayBackground';
import cn from '@/lib/cn';
import { IconChevronLeft } from '@tabler/icons-react';

export default function ScheduleConfirmModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const t = useTranslations('event.components.ScheduleConfirmModal');
  const state = useScheduleConfirmState();

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex flex-col bg-gray-05"
      role="dialog"
      aria-modal="true"
      aria-labelledby="schedule-confirm-title"
    >
      <GrayBackground device="desktop" breakpoint="md" />
      <EventFormTopNavBar />
      <ModalHeader onClose={onClose} />

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
          <div className="flex w-full flex-col gap-6 md:flex-row md:gap-8">
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
              onConfirm={onClose}
            />
            <RightPanel
              recommendedTimes={state.recommendedTimes}
              selectedSlotIndex={state.selectedSlotIndex}
              onSelectSlot={state.handleSelectRecommended}
            />
          </div>
        </div>

        <div className="sticky bottom-0 left-0 w-full md:mt-8 md:static md:w-[25rem] md:bg-transparent">
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
