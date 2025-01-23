import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import BadgeFloatingBottomButton from '@/components/button/BadgeFloatingBottomButton';
import { FooterContext } from '@/contexts/FooterContext';
import cn from '@/utils/cn';

interface MainContentForMobileProps {
  tabActive: string;
  handleMyScheduleCreateButtonClick: () => void;
}

export default function MainContentForMobile({
  tabActive,
  handleMyScheduleCreateButtonClick,
}: MainContentForMobileProps) {
  const { isFooterShown } = useContext(FooterContext);

  return (
    <main className="px-4 pb-20">
      <>
        <Outlet />
      </>
      {tabActive === 'schedules' && (
        <BadgeFloatingBottomButton
          variant="black"
          name="스케줄 추가"
          onClick={handleMyScheduleCreateButtonClick}
          className={cn({
            'pointer-events-none opacity-0 duration-150': isFooterShown,
          })}
        />
      )}
    </main>
  );
}
