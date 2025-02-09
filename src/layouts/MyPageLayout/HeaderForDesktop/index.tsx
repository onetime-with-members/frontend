import { TabActiveType } from '..';

import PenIcon from '@/components/icon/PenIcon';

interface HeaderForDesktopProps {
  pageTitle: string | undefined;
  tabActive: TabActiveType;
  onMyScheduleEditButtonClick: () => void;
}

export default function HeaderForDesktop({
  pageTitle,
  tabActive,
  onMyScheduleEditButtonClick,
}: HeaderForDesktopProps) {
  return (
    <div className="sticky top-[64px] z-20 flex items-center justify-between bg-gray-00 py-2">
      <h1 className="text-[1.75rem] font-semibold">{pageTitle}</h1>
      {tabActive === 'schedules' && (
        <button onClick={onMyScheduleEditButtonClick}>
          <PenIcon fill="#31333F" />
        </button>
      )}
    </div>
  );
}
