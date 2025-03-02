import { useTranslation } from 'react-i18next';

import Button from '@/components/button/Button/Button';

interface BottomButtonForDesktopProps {
  onClick: () => void;
  disabled: boolean;
}

export default function BottomButtonForDesktop({
  onClick,
  disabled,
}: BottomButtonForDesktopProps) {
  const { t } = useTranslation();

  return (
    <div className="hidden sm:block">
      <Button variant="dark" onClick={onClick} disabled={disabled} fullWidth>
        {t('scheduleAdd.next')}
      </Button>
    </div>
  );
}
