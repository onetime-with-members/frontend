import { useContext, useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';

import BadgeButton from '@/components/button/BadgeButton';
import ListIcon from '@/components/icon/ListIcon';
import TimeBlockIcon from '@/components/icon/TimeBlockIcon';
import { FooterContext } from '@/contexts/FooterContext';
import { MyScheduleContext } from '@/contexts/MyScheduleContext';
import { ScrollContext } from '@/contexts/ScrollContext';
import cn from '@/utils/cn';
import { IconPlus } from '@tabler/icons-react';

interface MainContentForDesktopProps {
  pageTitle: string | undefined;
  tabActive: string;
  handleViewModeButtonClick: () => void;
  handleMyScheduleCreateButtonClick: () => void;
}

export default function MainContentForDesktop({
  pageTitle,
  tabActive,
  handleViewModeButtonClick,
  handleMyScheduleCreateButtonClick,
}: MainContentForDesktopProps) {
  const [desktopInnerContentWidth, setDesktopInnerContentWidth] = useState(0);

  const desktopInnerContentRef = useRef<HTMLDivElement>(null);

  const { scrollContainerRef } = useContext(ScrollContext);
  const { isFooterShown } = useContext(FooterContext);
  const { viewMode } = useContext(MyScheduleContext);

  useEffect(() => {
    function handleResize() {
      if (desktopInnerContentRef.current) {
        setDesktopInnerContentWidth(desktopInnerContentRef.current.clientWidth);
      }
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [desktopInnerContentRef]);

  return (
    <main
      ref={desktopInnerContentRef}
      className="relative flex flex-1 flex-col gap-2 pb-20 pt-8"
    >
      <div className="sticky top-[64px] z-10 flex items-center justify-between bg-gray-00 py-2">
        <h1 className="text-[1.75rem] font-semibold">{pageTitle}</h1>
        {tabActive === 'schedules' && (
          <button onClick={handleViewModeButtonClick}>
            {viewMode === 'timeblock' ? <TimeBlockIcon /> : <ListIcon />}
          </button>
        )}
      </div>
      <div ref={scrollContainerRef} className="flex-1">
        <Outlet />
      </div>
      {tabActive === 'schedules' && (
        <div
          className={cn(
            'fixed bottom-8 hidden w-full items-center justify-center md:flex',
            {
              'pointer-events-none opacity-0 duration-150': isFooterShown,
              hidden: tabActive !== 'schedules',
            },
          )}
          style={{
            width: desktopInnerContentWidth,
          }}
        >
          <BadgeButton
            variant="black"
            onClick={handleMyScheduleCreateButtonClick}
          >
            <span className="flex items-center justify-center gap-1">
              <span>스케줄 추가</span>
              <span>
                <IconPlus size={24} />
              </span>
            </span>
          </BadgeButton>
        </div>
      )}
    </main>
  );
}
