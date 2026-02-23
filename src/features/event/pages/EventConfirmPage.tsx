'use client';

import { useTranslations } from 'next-intl';

import LeftPanel from '../components/confirm/LeftPanel';
import ModalHeader from '../components/confirm/ModalHeader';
import RightPanel from '../components/confirm/RightPanel';
import { useScheduleConfirmState } from '../hooks/useScheduleConfirmState';
import GrayBackground from '@/components/GrayBackground';
import NavBar from '@/components/NavBar';
import Button from '@/components/button';
import { useRouter } from '@/i18n/navigation';
import cn from '@/lib/cn';
import { IconChevronLeft } from '@tabler/icons-react';

export default function EventConfirmPage() {
  const t = useTranslations('event.pages.EventConfirmPage');
  const router = useRouter();

  const {
    isConfirmDisabled,
    recommendedTimes,
    selectedSlotIndex,
    handleSelectRecommended,
  } = useScheduleConfirmState();

  function handleClose() {
    router.back();
  }

  return (
    <div className="flex flex-col bg-gray-00 md:bg-gray-05">
      <GrayBackground device="desktop" breakpoint="md" />
      <div className="hidden md:block">
        <NavBar />
      </div>
      <ModalHeader
        onClose={handleClose}
        isConfirmDisabled={isConfirmDisabled}
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
            <h1 className="text-gray-90 text-lg-300">{t('title')}</h1>
          </div>
          <div className="flex w-full flex-col gap-8 bg-white md:flex-row">
            <LeftPanel />
            <RightPanel
              recommendedTimes={recommendedTimes}
              selectedSlotIndex={selectedSlotIndex}
              onSelectSlot={handleSelectRecommended}
            />
          </div>
        </div>
        <div className="sticky bottom-0 left-0 hidden w-full md:static md:mt-8 md:block md:w-[25rem] md:bg-transparent">
          <Button
            type="button"
            variant="dark"
            fullWidth
            className={cn({
              'pointer-events-none cursor-default': isConfirmDisabled,
            })}
            disabled={isConfirmDisabled}
            onClick={() => !isConfirmDisabled && handleClose()}
          >
            {t('confirmButton')}
          </Button>
        </div>
      </main>
    </div>
  );
}
