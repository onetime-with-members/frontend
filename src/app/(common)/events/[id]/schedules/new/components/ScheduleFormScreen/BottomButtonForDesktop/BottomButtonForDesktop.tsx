import { useTranslations } from 'next-intl';

import FloatingBottomButton from '@/components/button/floating-bottom-button';

interface BottomButtonForDesktopProps {
  onClick: () => void;
  isSubmitting: boolean;
}

export default function BottomButtonForDesktop({
  onClick,
  isSubmitting,
}: BottomButtonForDesktopProps) {
  const t = useTranslations('scheduleAdd');

  return (
    <div className="hidden sm:block">
      <FloatingBottomButton variant="dark" maxWidth={480} onClick={onClick}>
        {isSubmitting ? t('addingSchedule') : t('addSchedule')}
      </FloatingBottomButton>
    </div>
  );
}
