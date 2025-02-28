import { useTranslation } from 'react-i18next';

import FloatingBottomButton from '@/components/button/FloatingBottomButton/FloatingBottomButton';

interface BottomButtonForDesktopProps {
  onClick: () => void;
  isSubmitting: boolean;
}

export default function BottomButtonForDesktop({
  onClick,
  isSubmitting,
}: BottomButtonForDesktopProps) {
  const { t } = useTranslation();

  return (
    <div className="hidden sm:block">
      <FloatingBottomButton variant="dark" maxWidth={480} onClick={onClick}>
        {isSubmitting
          ? t('scheduleAdd.addingSchedule')
          : t('scheduleAdd.addSchedule')}
      </FloatingBottomButton>
    </div>
  );
}
