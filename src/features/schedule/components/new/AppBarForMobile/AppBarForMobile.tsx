import { useTranslations } from 'next-intl';

import { IconChevronLeft } from '@tabler/icons-react';

export default function AppBarForMobile({
  onBackButtonClick,
}: {
  onBackButtonClick: () => void;
}) {
  const t = useTranslations('scheduleAdd');

  return (
    <header className="block h-[69px] sm:hidden">
      <div className="fixed left-0 top-0 z-50 w-full bg-white px-4">
        <div className="mx-auto grid max-w-screen-sm grid-cols-3 py-5">
          <div className="flex items-center">
            <button type="button" onClick={onBackButtonClick}>
              <IconChevronLeft size={24} className="text-gray-80" />
            </button>
          </div>
          <h2 className="flex items-center justify-center whitespace-nowrap text-center text-gray-90 text-lg-300">
            {t('enterSchedule')}
          </h2>
          <div id="schedule-submit-button" />
        </div>
      </div>
    </header>
  );
}
