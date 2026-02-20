import { useTranslations } from 'next-intl';

import Button from '@/components/button';

export default function SubmitButton({ disabled }: { disabled: boolean }) {
  const t = useTranslations('WithdrawPage');

  return (
    <Button type="submit" variant="danger" disabled={disabled} fullWidth>
      {t('withdraw')}
    </Button>
  );
}
