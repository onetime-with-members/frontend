import { useTranslations } from 'next-intl';

import Button from '@/components/button';

export default function SubmitButton({ disabled }: { disabled: boolean }) {
  const t = useTranslations('policyEdit');

  return (
    <Button type="submit" variant="black" fullWidth disabled={disabled}>
      {t('submit')}
    </Button>
  );
}
