'use client';

import { useTranslations } from 'next-intl';

import Button from '@/components/button';
import { useProgressRouter } from '@/navigation';

export default function BottomCTAButton() {
  const progressRouter = useProgressRouter();
  const t = useTranslations('landing');

  function handleStartButtonClick() {
    progressRouter.push('/events/new');
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
