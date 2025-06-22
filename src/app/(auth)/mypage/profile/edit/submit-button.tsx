import { useTranslations } from 'next-intl';
import { useFormStatus } from 'react-dom';

import Button from '@/components/button';
import FloatingBottomButton from '@/components/button/floating-bottom-button';

export function DesktopSubmitButton({ isDisabled }: { isDisabled: boolean }) {
  const { pending } = useFormStatus();

  const t = useTranslations('profileEdit');

  return (
    <Button
      type="submit"
      variant="dark"
      className="hidden sm:flex"
      fullWidth
      disabled={isDisabled}
    >
      {pending ? t('saving') : t('save')}
    </Button>
  );
}

export function MobileSubmitButton({ isDisabled }: { isDisabled: boolean }) {
  const { pending } = useFormStatus();

  const t = useTranslations('profileEdit');

  return (
    <FloatingBottomButton
      type="submit"
      variant="dark"
      className="sm:hidden"
      disabled={isDisabled}
    >
      {pending ? t('saving') : t('save')}
    </FloatingBottomButton>
  );
}
