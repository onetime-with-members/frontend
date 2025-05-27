import { useTranslations } from 'next-intl';

import FloatingBottomButton from '@/components/button/floating-bottom-button';

interface BottomButtonForMobileProps {
  onClick: () => void;
  disabled: boolean;
}

export default function BottomButtonForMobile({
  onClick,
  disabled,
}: BottomButtonForMobileProps) {
  const t = useTranslations('scheduleAdd');

  return (
    <div className="block sm:hidden">
      <FloatingBottomButton
        variant="black"
        onClick={onClick}
        disabled={disabled}
        fullWidth
      >
        {t('next')}
      </FloatingBottomButton>
    </div>
  );
}
