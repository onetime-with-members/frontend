import { useTranslations } from 'next-intl';

import { IconChevronLeft } from '@tabler/icons-react';

export default function DesktopHeader({
  onBackButtonClick,
}: {
  onBackButtonClick: () => void;
}) {
  const t = useTranslations('event.pages.EventConfirmPage');

  return (
    <header className="hidden w-full items-center justify-start gap-[2px] pb-6 md:flex">
      <button
        type="button"
        onClick={onBackButtonClick}
        className="flex items-center justify-center"
        aria-label={t('cancel')}
      >
        <IconChevronLeft size={32} />
      </button>
      <h1 className="text-gray-90 text-lg-300">{t('title')}</h1>
    </header>
  );
}
