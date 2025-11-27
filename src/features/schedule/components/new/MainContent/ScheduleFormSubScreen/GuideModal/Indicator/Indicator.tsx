import { useContext } from 'react';

import IndicatorDot from './IndicatorDot';
import { GuideModalContext } from '@/features/schedule/contexts/GuideModalContext';

export default function Indicator() {
  const {
    currentGuideContentsIndex,
    guideContentsListLength,
    handleMoveGuideContents,
  } = useContext(GuideModalContext);

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
