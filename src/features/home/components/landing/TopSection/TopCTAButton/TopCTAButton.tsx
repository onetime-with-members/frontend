'use client';

import { useTranslations } from 'next-intl';

import Button from '@/components/button';
import { useProgressRouter } from '@/navigation';

export default function TopCTAButton() {
  const progressRouter = useProgressRouter();
  const t = useTranslations('landing');

  function handleClick() {
    progressRouter.push('/events/new');
  }

  return (
    <div className="sticky bottom-4 z-30 mx-auto mt-9 flex w-full items-center justify-center px-4">
      <Button
        variant="dark"
        className="w-full max-w-80"
        onClick={handleClick}
        fullWidth
      >
        {t('button.start')}
      </Button>
    </div>
  );
}
