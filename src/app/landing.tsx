'use client';

import { useTranslations } from 'next-intl';

import Button from '@/components/button';
import { useRouter } from '@/navigation';

export function TopCTAButton() {
  const router = useRouter();
  const t = useTranslations('landing');

  function handleStartButtonClick() {
    router.push('/events/new');
  }

  return (
    <Button
      variant="dark"
      className="w-full max-w-80"
      onClick={handleStartButtonClick}
      fullWidth
    >
      {t('button.start')}
    </Button>
  );
}

export function BottomCTAButton() {
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
