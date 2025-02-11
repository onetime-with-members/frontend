import { useNavigate } from 'react-router-dom';

import { TabActiveType } from '../MyPageLayout';
import PenIcon from '@/components/icon/PenIcon';
import { IconChevronLeft } from '@tabler/icons-react';

interface TopAppBarForMobileProps {
  pageTitle: string | undefined;
  tabActive: TabActiveType;
  onMyScheduleEditButtonClick: () => void;
}

export default function TopAppBarForMobile({
  pageTitle,
  tabActive,
  onMyScheduleEditButtonClick,
}: TopAppBarForMobileProps) {
  const navigate = useNavigate();

  function handleBackButtonClick() {
    navigate(-1);
  }

  return (
    <header>
      <nav className="h-[4rem]">
        <div className="fixed z-[9999] flex h-[4rem] w-full justify-center bg-gray-00 px-4">
          <div className="mx-auto grid w-full max-w-screen-md grid-cols-3">
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
                <button onClick={onMyScheduleEditButtonClick}>
                  <PenIcon fill="#31333F" />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
