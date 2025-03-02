import { useTranslation } from 'react-i18next';

import FloatingBottomButton from '@/components/button/FloatingBottomButton/FloatingBottomButton';

interface BottomButtonForMobileProps {
  handleNextButtonClick: () => void;
  disabled: boolean;
}

export default function BottomButtonForMobile({
  handleNextButtonClick,
  disabled,
}: BottomButtonForMobileProps) {
  const { t } = useTranslation();

  return (
    <div className="block md:hidden">
      <FloatingBottomButton
        variant="black"
        onClick={handleNextButtonClick}
        disabled={disabled}
        fullWidth
      >
        {t('onboarding.next')}
      </FloatingBottomButton>
    </div>
  );
}
