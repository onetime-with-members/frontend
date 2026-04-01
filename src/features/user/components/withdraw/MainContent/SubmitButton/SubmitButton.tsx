import { useTranslations } from 'next-intl';

import Button from '@/components/button';
import cn from '@/lib/cn';

export default function SubmitButton({
  disabled,
  isLoading,
}: {
  disabled: boolean;
  isLoading: boolean;
}) {
  const t = useTranslations('user.pages.WithdrawPage');

  return (
    <Button
      type="submit"
      variant="danger"
      disabled={disabled}
      fullWidth
      className={cn({ 'pointer-events-none': isLoading })}
    >
      {isLoading ? t('withdrawing') : t('withdraw')}
    </Button>
  );
}
