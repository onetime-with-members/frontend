import { useTranslations } from 'next-intl';

import Button from '@/components/button/Button/Button';
import { useRouter } from 'next/navigation';

export default function BottomButton() {
  const router = useRouter();
  const t = useTranslations('landing');

  function handleStartButtonClick() {
    router.push('/events/new');
  }

  return (
    <Button
      variant="black"
      className="w-full max-w-80"
      onClick={handleStartButtonClick}
      fullWidth
    >
      {t('button.createEvent')}
    </Button>
  );
}
