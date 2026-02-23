import { useTranslations } from 'next-intl';

import cn from '@/lib/cn';
import { IconChevronLeft } from '@tabler/icons-react';

type ModalHeaderProps = {
  onBackButtonClick: () => void;
  isConfirmDisabled?: boolean;
  onComplete?: () => void;
};

export default function MobileHeader({
  onBackButtonClick,
  isConfirmDisabled = true,
  onComplete,
}: ModalHeaderProps) {
  const t = useTranslations('event.pages.EventConfirmPage');

  return (
    <header className="flex shrink-0 items-center justify-between bg-gray-00 px-4 py-3 md:hidden">
      <button
        type="button"
        className="-m-1 flex rounded-lg p-1 text-gray-70 hover:bg-gray-10"
        onClick={onBackButtonClick}
        aria-label={t('cancel')}
      >
        <IconChevronLeft size={24} />
      </button>
      <h1 id="schedule-confirm-title" className="text-gray-70 text-lg-300">
        {t('title')}
      </h1>
      <button
        type="button"
        className={cn(
          'rounded-lg px-3 py-1.5 text-sm-200',
          isConfirmDisabled
            ? 'bg-gray-10 text-gray-30'
            : 'bg-[#E8EBFC] text-[#4C65E5] md:bg-primary-40 md:text-gray-00',
        )}
        disabled={isConfirmDisabled}
        onClick={() => !isConfirmDisabled && onComplete?.()}
      >
        {t('done')}
      </button>
    </header>
  );
}
