import { useContext } from 'react';

import ListIcon from '@/components/icon/ListIcon';
import TimeBlockIcon from '@/components/icon/TimeBlockIcon';
import OverlayCover from '@/components/overlay/OverlayCover';
import { MyScheduleContext } from '@/contexts/MyScheduleContext';

interface HeaderForDesktopProps {
  pageTitle: string | undefined;
  tabActive: string;
  viewMode: string;
  handleViewModeButtonClick: () => void;
}

export default function HeaderForDesktop({
  pageTitle,
  tabActive,
  viewMode,
  handleViewModeButtonClick,
}: HeaderForDesktopProps) {
  const { selectedTimeBlockId } = useContext(MyScheduleContext);

  return (
    <div className="sticky top-[64px] z-20 flex items-center justify-between bg-gray-00 py-2">
      <h1 className="text-[1.75rem] font-semibold">{pageTitle}</h1>
      {tabActive === 'schedules' && (
        <button onClick={handleViewModeButtonClick}>
          {viewMode === 'timeblock' ? <TimeBlockIcon /> : <ListIcon />}
        </button>
      )}
      {selectedTimeBlockId !== null && <OverlayCover />}
    </div>
  );
}
