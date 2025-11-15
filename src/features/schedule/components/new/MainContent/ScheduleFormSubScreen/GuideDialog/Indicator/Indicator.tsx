import { useContext } from 'react';

import IndicatorDot from './IndicatorDot';
import { GuideDialogContext } from '@/features/schedule/contexts/GuideDialogContext';

export default function Indicator() {
  const {
    currentGuideContentsIndex,
    guideContentsListLength,
    handleMoveGuideContents,
  } = useContext(GuideDialogContext);

  return (
    <div className="flex h-1.5 gap-1">
      {Array.from({ length: guideContentsListLength }, (_, index) => (
        <IndicatorDot
          key={index}
          active={index === currentGuideContentsIndex}
          onClick={() => handleMoveGuideContents(index)}
        />
      ))}
    </div>
  );
}
