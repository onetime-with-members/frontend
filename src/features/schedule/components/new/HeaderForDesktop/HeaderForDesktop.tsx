import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import { ScheduleFormContext } from '@/features/schedule/contexts/ScheduleFormContext';
import { IconChevronLeft } from '@tabler/icons-react';

export default function HeaderForDesktop() {
  const { handleBackButtonClick } = useContext(ScheduleFormContext);

  const t = useTranslations('scheduleAdd');

  return (
    <header className="mx-auto hidden max-w-[480px] items-center py-8 sm:flex">
      <button type="button" onClick={handleBackButtonClick}>
        <IconChevronLeft size={32} />
      </button>
      <h1 className="text-gray-90 title-lg-300">{t('enterSchedule')}</h1>
    </header>
  );
}
