import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import ListIcon from '@/components/icon/ListIcon';
import TimeBlockIcon from '@/components/icon/TimeBlockIcon';
import { MyScheduleContext } from '@/contexts/MyScheduleContext';
import { IconChevronLeft } from '@tabler/icons-react';

interface TopAppBarForMobileProps {
  pageTitle: string | undefined;
  tabActive: string;
  handleViewModeButtonClick: () => void;
}

export default function TopAppBarForMobile({
  pageTitle,
  tabActive,
  handleViewModeButtonClick,
}: TopAppBarForMobileProps) {
  const { selectedTimeBlockId, viewMode } = useContext(MyScheduleContext);

  const navigate = useNavigate();

  function handleBackButtonClick() {
    navigate(-1);
  }

  return (
    <header>
      <nav className="flex h-[4rem]">
        <div className="fixed z-[9999] flex h-[4rem] w-full justify-center bg-gray-00 px-4">
          {selectedTimeBlockId !== null && (
            <div className="absolute left-0 top-0 h-full w-full bg-gray-90 bg-opacity-30" />
          )}
          <div className="w-full max-w-screen-md">
            <div className="grid h-[4rem] grid-cols-3">
              <div className="flex items-center justify-start">
                <button onClick={handleBackButtonClick}>
                  <IconChevronLeft size={24} />
                </button>
              </div>
              <div className="flex items-center justify-center text-gray-90 text-lg-300">
                {pageTitle}
              </div>
              <div className="flex items-center justify-end">
                {tabActive === 'schedules' && (
                  <button onClick={handleViewModeButtonClick}>
                    {viewMode === 'timeblock' ? (
                      <TimeBlockIcon />
                    ) : (
                      <ListIcon />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
