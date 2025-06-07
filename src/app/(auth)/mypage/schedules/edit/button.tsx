import { useTranslations } from 'next-intl';
import { useFormStatus } from 'react-dom';

import SmallButton from '@/components/button/small-button';

export default function SubmitButton() {
  const { pending } = useFormStatus();

  const t = useTranslations('myScheduleEdit');

  return (
    <SmallButton type="submit" disabled={pending}>
      {t('done')}
    </SmallButton>
  );
}
