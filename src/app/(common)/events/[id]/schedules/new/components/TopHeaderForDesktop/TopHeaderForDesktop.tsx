import { useTranslations } from 'next-intl';

import { IconChevronLeft } from '@tabler/icons-react';

interface TopHeaderForDesktopProps {
  handleBackButtonClick: () => void;
}

export default function TopHeaderForDesktop({
  handleBackButtonClick,
}: TopHeaderForDesktopProps) {
  const t = useTranslations('scheduleAdd');

  return (
    <header className="mx-auto hidden max-w-[480px] items-center py-8 sm:flex">
      <button onClick={handleBackButtonClick}>
        <IconChevronLeft size={32} />
      </button>
      <h1 className="text-gray-90 title-lg-300">{t('enterSchedule')}</h1>
    </header>
  );
}
