import { useTranslations } from 'next-intl';

import FloatingBottomButton from '@/components/button/FloatingBottomButton/FloatingBottomButton';

interface BottomButtonForMobileProps {
  handleNextButtonClick: () => void;
  disabled: boolean;
}

export default function BottomButtonForMobile({
  handleNextButtonClick,
  disabled,
}: BottomButtonForMobileProps) {
  const t = useTranslations('onboarding');

  return (
    <div className="block md:hidden">
      <FloatingBottomButton
        variant="black"
        onClick={handleNextButtonClick}
        disabled={disabled}
        fullWidth
      >
        {t('next')}
      </FloatingBottomButton>
    </div>
  );
}
