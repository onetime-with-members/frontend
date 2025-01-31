import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import HeaderForDesktop from './HeaderForDesktop';
import SideTabContentForDesktop from './SideTabContentForDesktop';
import TopAppBarForMobile from './TopAppBarForMobile';
import NavBar from '@/components/NavBar';
import { ScrollContext } from '@/contexts/ScrollContext';

export type TabActiveType = 'events' | 'schedules' | 'profile';

function currentTabActive(pathname: string): TabActiveType {
  if (pathname.startsWith('/mypage/events')) {
    return 'events';
  }
  if (pathname.startsWith('/mypage/schedules')) {
    return 'schedules';
  }
  return 'profile';
}

export default function MyPageLayout() {
  const [tabActive, setTabActive] = useState<TabActiveType>(
    currentTabActive(window.location.pathname),
  );

  const { scrollContainerRef } = useContext(ScrollContext);

  const location = useLocation();
  const navigate = useNavigate();

  const pageTitle = {
    events: '참여한 이벤트',
    schedules: '내 스케줄',
    profile: '프로필 정보',
  }[tabActive];

  function handleMyScheduleEditButtonClick() {
    navigate('/mypage/schedules/edit');
  }

  useEffect(() => {
    setTabActive(currentTabActive(location.pathname));
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
          onMyScheduleEditButtonClick={handleMyScheduleEditButtonClick}
        />
        <main className="px-4 pb-20">
          <Outlet />
        </main>
      </div>

      {/* Desktop */}
      <div className="hidden min-h-screen flex-col md:flex">
        <NavBar shadow={false} />
        <div className="px-4">
          <div className="mx-auto flex w-full max-w-screen-md gap-10">
            <SideTabContentForDesktop tabActive={tabActive} />
            <main className="relative flex flex-1 flex-col gap-2 pb-20 pt-8">
              <HeaderForDesktop
                pageTitle={pageTitle}
                onMyScheduleEditButtonClick={handleMyScheduleEditButtonClick}
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
