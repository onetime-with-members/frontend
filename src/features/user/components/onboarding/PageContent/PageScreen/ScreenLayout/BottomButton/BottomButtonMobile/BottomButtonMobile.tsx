import { useTranslations } from 'next-intl';

import FloatingBottomButton from '@/components/button/FloatingBottomButton';

export default function BottomButtomMobile({
  disabled = false,
}: {
  disabled?: boolean;
}) {
  const t = useTranslations('onboarding');

  return (
    <div className="block md:hidden">
      <FloatingBottomButton
        type="submit"
        variant="black"
        disabled={disabled}
        fullWidth
      >
        {t('next')}
      </FloatingBottomButton>
    </div>
  );
}
