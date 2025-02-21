import { useTranslation } from 'react-i18next';

import Button from '@/components/button/Button/Button';

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
  const { t } = useTranslation();

  return (
    <div className="hidden flex-col gap-4 md:flex">
      <Button
        onClick={handleNextButtonClick}
        disabled={disabled}
        variant="dark"
        fullWidth
      >
        {t('onboarding.next')}
      </Button>
      <button
        className="text-gray-40 text-md-200"
        onClick={handleBackButtonClick}
      >
        {page === 1 ? t('onboarding.goBack') : t('onboarding.previous')}
      </button>
    </div>
  );
}
