import { useTranslations } from 'next-intl';

import Button from '@/components/button';
import cn from '@/lib/cn';

export default function SubmitButton({
  disabled,
  isPending,
}: {
  disabled: boolean;
  isPending: boolean;
}) {
  const t = useTranslations('user.pages.WithdrawPage');

  return (
    <Button
      type="submit"
      variant="danger"
      disabled={disabled}
      fullWidth
      className={cn({ 'pointer-events-none': isPending })}
    >
      {isPending ? t('withdrawing') : t('withdraw')}
    </Button>
  );
}
