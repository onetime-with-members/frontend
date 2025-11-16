import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import Button from '@/components/button';
import { GuideModalContext } from '@/features/schedule/contexts/GuideModalContext';

export default function NextButton() {
  const {
    handleNextGuideContents,
    currentGuideContentsIndex,
    guideContentsListLength,
  } = useContext(GuideModalContext);

  const t = useTranslations('scheduleGuideModal');

  return (
    <Button fullWidth onClick={handleNextGuideContents}>
      {currentGuideContentsIndex === guideContentsListLength - 1
        ? t('start')
        : t('next')}
    </Button>
  );
}
