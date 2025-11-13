import { useTranslations } from 'next-intl';

import Button from '@/components/button';

export default function DesktopSubmitButton({ isValid }: { isValid: boolean }) {
  const t = useTranslations('profileEdit');

  return (
    <Button
      type="submit"
      variant="dark"
      className="hidden sm:flex"
      fullWidth
      disabled={!isValid}
    >
      {t('save')}
    </Button>
  );
}
