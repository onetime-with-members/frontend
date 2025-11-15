import { useContext } from 'react';

import Button from '@/components/button';
import { GuideDialogContext } from '@/features/schedule/contexts/GuideDialogContext';

export default function NextButton() {
  const {
    handleNextGuideContents,
    currentGuideContentsIndex,
    guideContentsListLength,
  } = useContext(GuideDialogContext);

  return (
    <Button fullWidth onClick={handleNextGuideContents}>
      {currentGuideContentsIndex === guideContentsListLength - 1
        ? '시작'
        : '다음'}
    </Button>
  );
}
