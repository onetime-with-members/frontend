import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import Button from '@/components/button';
import { OnboardingContext } from '@/features/user/contexts/OnboardingContext';

export default function BottomButtomDesktop({
  disabled = false,
  onBackButtonClick,
}: {
  disabled: boolean;
  onBackButtonClick: () => void;
}) {
  const { pageIndex } = useContext(OnboardingContext);

  const t = useTranslations('onboarding');

  return (
    <div className="hidden flex-col gap-4 md:flex">
      <Button type="submit" disabled={disabled} variant="dark" fullWidth>
        {t('next')}
      </Button>
      <button
        type="button"
        className="text-gray-40 text-md-200"
        onClick={onBackButtonClick}
      >
        {pageIndex === 0 ? t('goBack') : t('previous')}
      </button>
    </div>
  );
}
