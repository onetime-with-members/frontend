import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import NavBar from '../components/NavBar';
import SideTabItem from '../components/SideTabItem';
import CalendarIcon from '../components/icon/CalendarIcon';
import EventIcon from '../components/icon/EventIcon';
import ProfileIcon from '../components/icon/ProfileIcon';
import { IconChevronLeft } from '@tabler/icons-react';

export default function MyPageLayout() {
  const [tabActive, setTabActive] = useState('events');

  const location = useLocation();
  const navigate = useNavigate();

  const pageTitle = {
    events: '참여한 이벤트',
    profile: '마이페이지',
  }[tabActive];

  function handleBackButtonClick() {
    navigate(-1);
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
      {/* 모바일 */}
      <div className="block md:hidden">
        <header>
          <nav className="flex h-[4rem]">
            <div className="fixed flex h-[4rem] w-full justify-center bg-gray-00 px-4">
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
                  <div />
                </div>
              </div>
            </div>
          </nav>
        </header>
        <main className="px-4">
          <Outlet />
        </main>
      </div>
      {/* 데스크탑 */}
      <div className="hidden min-h-screen flex-col md:flex">
        <NavBar />
        <main className="flex w-full flex-1">
          <div className="flex w-full flex-col px-4">
            <div className="mx-auto flex w-full max-w-screen-md gap-4 min-[850px]:gap-10">
              <div className="border-l border-r border-gray-10 px-5 py-7">
                <ul className="flex flex-col gap-3">
                  <SideTabItem
                    to={'/mypage/events'}
                    icon={
                      <EventIcon
                        fill={tabActive === 'events' ? '#4C65E5' : '#9296AB'}
                      />
                    }
                    className="w-[10rem]"
                    active={tabActive === 'events'}
                  >
                    참여한 이벤트
                  </SideTabItem>
                  <SideTabItem
                    to={'/mypage/schedules'}
                    icon={
                      <CalendarIcon
                        fill={tabActive === 'schedules' ? '#4C65E5' : '#9296AB'}
                        innerFill="#FFFFFF"
                      />
                    }
                  >
                    내 스케줄
                  </SideTabItem>
                  <SideTabItem
                    active={tabActive === 'profile'}
                    to={'/mypage/profile'}
                    icon={
                      <ProfileIcon
                        fill={tabActive === 'profile' ? '#4C65E5' : '#9296AB'}
                      />
                    }
                  >
                    마이페이지
                  </SideTabItem>
                </ul>
              </div>
              <div className="flex max-h-screen flex-1 flex-col gap-4 py-10">
                <h1 className="text-[1.75rem] font-semibold">{pageTitle}</h1>
                <div className="scrollbar-hidden flex-1 overflow-y-auto">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
