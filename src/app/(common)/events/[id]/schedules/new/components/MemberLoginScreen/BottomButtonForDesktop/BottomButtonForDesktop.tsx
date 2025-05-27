import { useTranslations } from 'next-intl';

import Button from '@/components/button/button';

interface BottomButtonForDesktopProps {
  onClick: () => void;
  disabled: boolean;
}

export default function BottomButtonForDesktop({
  onClick,
  disabled,
}: BottomButtonForDesktopProps) {
  const t = useTranslations('scheduleAdd');

  return (
    <div className="hidden sm:block">
      <Button variant="dark" onClick={onClick} disabled={disabled} fullWidth>
        {t('next')}
      </Button>
    </div>
  );
}
