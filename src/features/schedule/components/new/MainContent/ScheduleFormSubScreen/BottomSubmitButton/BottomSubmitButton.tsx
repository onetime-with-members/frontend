import { useTranslations } from 'next-intl';
import { useFormStatus } from 'react-dom';

import FloatingBottomButton from '@/components/button/FloatingBottomButton';

export default function BottomSubmitButton() {
  const { pending } = useFormStatus();

  const t = useTranslations('ScheduleNewPage');

  return (
    <FloatingBottomButton variant="dark" maxWidth={480}>
      {pending ? t('addingSchedule') : t('addSchedule')}
    </FloatingBottomButton>
  );
}
