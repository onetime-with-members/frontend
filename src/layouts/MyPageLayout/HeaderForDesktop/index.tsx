import ListIcon from '@/components/icon/ListIcon';
import TimeBlockIcon from '@/components/icon/TimeBlockIcon';

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
  return (
    <div className="sticky top-[64px] z-10 flex items-center justify-between bg-gray-00 py-2">
      <h1 className="text-[1.75rem] font-semibold">{pageTitle}</h1>
      {tabActive === 'schedules' && (
        <button onClick={handleViewModeButtonClick}>
          {viewMode === 'timeblock' ? <TimeBlockIcon /> : <ListIcon />}
        </button>
      )}
    </div>
  );
}
