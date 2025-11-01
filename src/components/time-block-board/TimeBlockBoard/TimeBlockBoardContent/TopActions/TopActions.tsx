import { useContext } from 'react';

import ClearButton from './ClearButton';
import DateIndicator from './DateIndicator';
import PossibleTimeToggle from './PossibleTimeToggle';
import ReloadButton from './ReloadButton';
import ResetButton from './ResetButton';
import { TimeBlockBoardContext } from '@/features/schedule/contexts/TimeBlockBoardContext';
import cn from '@/lib/cn';

export default function TopActions() {
  const {
    isEmpty,
    isFull,
    isPossibleTime,
    initialSchedule,
    editable,
    isEdited,
    topContentStyle,
    topContentClassName,
    isNewGuest,
    isScheduleEmpty,
    handleAvailableToggle,
    handleClearButtonClick,
    handleReloadButtonClick,
    handleResetButtonClick,
  } = useContext(TimeBlockBoardContext);

  return (
    <div
      style={topContentStyle}
      className={cn('sticky top-0 z-10 bg-gray-00', topContentClassName)}
    >
      {editable && (
        <div className="flex items-center justify-between pt-2">
          <PossibleTimeToggle
            isPossibleTime={isPossibleTime}
            onToggle={handleAvailableToggle}
          />
          {((isEmpty && isPossibleTime) || (isFull && !isPossibleTime)) &&
          isEdited &&
          !isNewGuest &&
          initialSchedule &&
          initialSchedule[0].schedules.length > 0 ? (
            isScheduleEmpty ? (
              <ReloadButton onClick={handleReloadButtonClick} />
            ) : (
              <ResetButton onClick={handleResetButtonClick} />
            )
          ) : (
            <ClearButton onClick={handleClearButtonClick} />
          )}
        </div>
      )}
      <DateIndicator />
    </div>
  );
}
