import { useTranslations } from 'next-intl';

import Button from '@/components/button/button';

interface BottomButtonForDesktopProps {
  handleNextButtonClick: () => void;
  handleBackButtonClick: () => void;
  disabled: boolean;
  page: number;
}

export default function BottomButtonForDesktop({
  handleNextButtonClick,
  handleBackButtonClick,
  disabled,
  page,
}: BottomButtonForDesktopProps) {
  const t = useTranslations('onboarding');

  return (
    <div className="hidden flex-col gap-4 md:flex">
      <Button
        onClick={handleNextButtonClick}
        disabled={disabled}
        variant="dark"
        fullWidth
      >
        {t('next')}
      </Button>
      <button
        className="text-gray-40 text-md-200"
        onClick={handleBackButtonClick}
      >
        {page === 1 ? t('goBack') : t('previous')}
      </button>
    </div>
  );
}
