'use client';

import { useTranslations } from 'next-intl';

import { IconChevronLeft } from '@tabler/icons-react';

type ModalHeaderProps = {
  onClose: () => void;
};

export default function ModalHeader({ onClose }: ModalHeaderProps) {
  const t = useTranslations('event.components.ScheduleConfirmModal');

  return (
    <div className="flex shrink-0 items-center gap-2 border-b border-gray-10 bg-gray-00 px-4 py-3 md:hidden">
      <button
        type="button"
        className="flex p-1 -m-1 rounded-lg text-gray-70 hover:bg-gray-10"
        onClick={onClose}
        aria-label={t('cancel')}
      >
        <IconChevronLeft size={24} />
      </button>
      <h1 id="schedule-confirm-title" className="text-gray-70 text-lg-300">
        {t('title')}
      </h1>
    </div>
  );
}
