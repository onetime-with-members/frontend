import { useTranslations } from 'next-intl';

import FloatingBottomButton from '@/components/button/floating-bottom-button';
import cn from '@/lib/cn';

export default function MobileSubmitButton({
  isValid,
  isPending,
}: {
  isValid: boolean;
  isPending: boolean;
}) {
  const t = useTranslations('profileEdit');

  return (
    <FloatingBottomButton
      type="submit"
      variant="dark"
      className={cn('sm:hidden', {
        'pointer-events-none cursor-default': isPending,
      })}
      disabled={!isValid}
    >
      {isPending ? t('saving') : t('save')}
    </FloatingBottomButton>
  );
}
