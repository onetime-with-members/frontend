import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet, useLocation } from 'react-router-dom';

import HeaderForDesktop from './HeaderForDesktop';
import SideTabContentForDesktop from './SideTabContentForDesktop';
import TopAppBarForMobile from './TopAppBarForMobile';
import NavBar from '@/components/NavBar';
import { MyScheduleContext } from '@/contexts/MyScheduleContext';
import { ScrollContext } from '@/contexts/ScrollContext';

export default function MyPageLayout() {
  const [tabActive, setTabActive] = useState('');

  const { selectedTimeBlockId, viewMode, setViewMode } =
    useContext(MyScheduleContext);
  const { scrollContainerRef } = useContext(ScrollContext);

  const location = useLocation();

  const pageTitle = {
    events: '참여한 이벤트',
    schedules: '내 스케줄',
    profile: '프로필 정보',
  }[tabActive];

  function handleViewModeButtonClick() {
    if (viewMode === 'timeblock') {
      setViewMode('list');
    } else {
      setViewMode('timeblock');
    }
  }

  useEffect(() => {
    if (location.pathname.startsWith('/mypage/events')) {
      setTabActive('events');
    } else if (location.pathname.startsWith('/mypage/schedules')) {
      setTabActive('schedules');
    } else if (location.pathname.startsWith('/mypage/profile')) {
      setTabActive('profile');
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>마이페이지 | OneTime</title>
      </Helmet>

      {/* Mobile */}
      <div className="block md:hidden">
        <TopAppBarForMobile
          pageTitle={pageTitle}
          tabActive={tabActive}
          handleViewModeButtonClick={handleViewModeButtonClick}
        />
        <main className="px-4 pb-20">
          <Outlet />
        </main>
      </div>

      {/* Desktop */}
      <div className="hidden min-h-screen flex-col md:flex">
        <NavBar overlay={selectedTimeBlockId !== null} shadow={false} />
        <div className="px-4">
          <div className="mx-auto flex w-full max-w-screen-md gap-10">
            <SideTabContentForDesktop tabActive={tabActive} />
            <main className="relative flex flex-1 flex-col gap-2 pb-20 pt-8">
              <HeaderForDesktop
                pageTitle={pageTitle}
                tabActive={tabActive}
                viewMode={viewMode}
                handleViewModeButtonClick={handleViewModeButtonClick}
              />
              <div ref={scrollContainerRef} className="flex-1">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
