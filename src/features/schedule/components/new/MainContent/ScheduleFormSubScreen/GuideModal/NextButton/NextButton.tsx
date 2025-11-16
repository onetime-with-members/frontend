import { useContext } from 'react';

import Button from '@/components/button';
import { GuideModalContext } from '@/features/schedule/contexts/GuideModalContext';

export default function NextButton() {
  const {
    handleNextGuideContents,
    currentGuideContentsIndex,
    guideContentsListLength,
  } = useContext(GuideModalContext);

  return (
    <Button fullWidth onClick={handleNextGuideContents}>
      {currentGuideContentsIndex === guideContentsListLength - 1
        ? '시작'
        : '다음'}
    </Button>
  );
}
