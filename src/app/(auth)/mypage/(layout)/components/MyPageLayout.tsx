'use client';

import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';

import HeaderForDesktop from './HeaderForDesktop/HeaderForDesktop';
import SideTabContentForDesktop from './SideTabContentForDesktop/SideTabContentForDesktop';
import TopAppBarForMobile from './TopAppBarForMobile/TopAppBarForMobile';
import NavBar from '@/components/nav-bar';
import { ScrollContext } from '@/contexts/ScrollContext';
import { useRouter } from '@/navigation';
import { usePathname } from 'next/navigation';

interface MyPageLayoutProps {
  children: React.ReactNode;
  pathname: string;
}

export type TabActiveType = 'events' | 'schedules' | 'profile' | null;

export type PageTitleType = string | React.ReactNode;

export function currentTabActive(pathname: string): TabActiveType {
  if (pathname.startsWith('/mypage/events')) {
    return 'events';
  }
  if (pathname.startsWith('/mypage/schedules')) {
    return 'schedules';
  }
  if (pathname.startsWith('/mypage/profile')) {
    return 'profile';
  }
  return null;
}

export default function MyPageLayout({
  children,
  pathname: _pathname,
}: MyPageLayoutProps) {
  const [tabActive, setTabActive] = useState<TabActiveType>(
    currentTabActive(_pathname),
  );

  const { scrollContainerRef } = useContext(ScrollContext);

  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('mypage');

  const pageTitle: PageTitleType =
    tabActive &&
    {
      events: t('allEvents'),
      schedules: t('mySchedule'),
      profile: t('profile'),
    }[tabActive];

  function handleMyScheduleEditButtonClick() {
    router.push('/mypage/schedules/edit');
  }

  useEffect(() => {
    setTabActive(currentTabActive(pathname));
  }, [pathname]);

  return (
    <>
      {/* Mobile */}
      <div className="block md:hidden">
        <TopAppBarForMobile
          pageTitle={pageTitle}
          tabActive={tabActive}
          onMyScheduleEditButtonClick={handleMyScheduleEditButtonClick}
        />
        <main className="pb-20">{children}</main>
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
                tabActive={tabActive}
                onMyScheduleEditButtonClick={handleMyScheduleEditButtonClick}
              />
              <div ref={scrollContainerRef} className="flex-1">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
