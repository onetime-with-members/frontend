import clsx from 'clsx';
import { useContext, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import NavBar from '../components/NavBar';
import SideTabItem from '../components/SideTabItem';
import BadgeButton from '../components/button/BadgeButton';
import BadgeFloatingBottomButton from '../components/floating-button/BadgeFloatingBottomButton';
import CalendarIcon from '../components/icon/CalendarIcon';
import EventIcon from '../components/icon/EventIcon';
import ListIcon from '../components/icon/ListIcon';
import ProfileIcon from '../components/icon/ProfileIcon';
import TimeBlockIcon from '../components/icon/TimeBlockIcon';
import { FooterContext } from '../contexts/FooterContext';
import { MyScheduleContext } from '../contexts/MyScheduleContext';
import { ScrollContext } from '../contexts/ScrollContext';
import { IconChevronLeft, IconPlus } from '@tabler/icons-react';

export default function MyPageLayout() {
  const [tabActive, setTabActive] = useState('events');

  const { selectedTimeBlockId, viewMode, setViewMode } =
    useContext(MyScheduleContext);
  const { scrollContainerRef } = useContext(ScrollContext);
  const { isFooterShown } = useContext(FooterContext);
  const [desktopInnerContentWidth, setDesktopInnerContentWidth] = useState(0);

  const desktopInnerContentRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const pageTitle = {
    events: '참여한 이벤트',
    schedules: '내 스케줄',
    profile: '마이페이지',
  }[tabActive];

  function handleBackButtonClick() {
    navigate(-1);
  }

  function handleViewModeButtonClick() {
    if (viewMode === 'timeblock') {
      setViewMode('list');
    } else {
      setViewMode('timeblock');
    }
  }

  function handleMyScheduleCreateButtonClick() {
    navigate('/mypage/schedules/new');
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
    <>
      {/* 모바일 */}
      <div className="block md:hidden">
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
        <main className="px-4 pb-20">
          <Outlet />
        </main>
        {tabActive === 'schedules' && (
          <BadgeFloatingBottomButton
            variant="black"
            name="스케줄 추가"
            onClick={handleMyScheduleCreateButtonClick}
            className={clsx({
              'pointer-events-none opacity-0 duration-150': isFooterShown,
            })}
          />
        )}
      </div>
      {/* 데스크탑 */}
      <div className="hidden min-h-screen flex-col md:flex">
        <NavBar overlay={selectedTimeBlockId !== null} />
        <div className="flex w-full flex-1">
          <div className="flex w-full flex-col px-4">
            <div className="mx-auto flex w-full max-w-screen-md gap-4 min-[850px]:gap-10">
              <nav className="border-l border-r border-gray-10 px-5 py-7">
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
                    active={tabActive === 'schedules'}
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
              </nav>
              <main
                ref={desktopInnerContentRef}
                className="relative flex max-h-screen flex-1 flex-col gap-4 py-10 pb-20"
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-[1.75rem] font-semibold">{pageTitle}</h1>
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
                <div
                  ref={scrollContainerRef}
                  className="scrollbar-hidden flex-1 overflow-y-auto"
                >
                  <Outlet />
                </div>
                {tabActive === 'schedules' && (
                  <div
                    className={clsx(
                      'fixed bottom-8 hidden w-full items-center justify-center md:flex',
                      {
                        'pointer-events-none opacity-0 duration-150':
                          isFooterShown,
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
