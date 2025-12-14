import { useTranslations } from 'next-intl';

import Button from '@/components/button';

export default function BottomButtomDesktop({
  disabled = false,
  onBackButtonClick,
  pageIndex,
}: {
  disabled: boolean;
  onBackButtonClick: () => void;
  pageIndex: number;
}) {
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
