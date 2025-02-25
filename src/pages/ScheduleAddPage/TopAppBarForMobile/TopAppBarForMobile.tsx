import { useTranslation } from 'react-i18next';

import SmallButton from '@/components/button/SmallButton/SmallButton';
import { IconChevronLeft } from '@tabler/icons-react';

interface TopAppBarForMobileProps {
  pageIndex: number;
  onBackButtonClick: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function TopAppBarForMobile({
  pageIndex,
  onBackButtonClick,
  onSubmit,
  isSubmitting,
}: TopAppBarForMobileProps) {
  const { t } = useTranslation();

  return (
    <header className="block h-[69px] sm:hidden">
      <div className="fixed left-0 top-0 z-50 w-full bg-white px-4">
        <div className="mx-auto grid max-w-screen-sm grid-cols-3 py-5">
          <div className="flex items-center">
            <button onClick={onBackButtonClick}>
              <IconChevronLeft size={24} className="text-gray-80" />
            </button>
          </div>
          <h2 className="flex items-center justify-center whitespace-nowrap text-center text-gray-90 text-lg-300">
            {t('scheduleAdd.enterSchedule')}
          </h2>
          {pageIndex === 1 && (
            <div className="flex items-center justify-end">
              <SmallButton
                variant={isSubmitting ? 'gray' : 'primary'}
                onClick={onSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? t('scheduleAdd.doing') : t('scheduleAdd.done')}
              </SmallButton>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
