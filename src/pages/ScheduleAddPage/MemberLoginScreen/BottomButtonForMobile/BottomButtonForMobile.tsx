import { useTranslation } from 'react-i18next';

import FloatingBottomButton from '@/components/button/FloatingBottomButton/FloatingBottomButton';

interface BottomButtonForMobileProps {
  onClick: () => void;
  disabled: boolean;
}

export default function BottomButtonForMobile({
  onClick,
  disabled,
}: BottomButtonForMobileProps) {
  const { t } = useTranslation();

  return (
    <div className="block sm:hidden">
      <FloatingBottomButton
        variant="black"
        onClick={onClick}
        disabled={disabled}
        fullWidth
      >
        {t('scheduleAdd.next')}
      </FloatingBottomButton>
    </div>
  );
}
