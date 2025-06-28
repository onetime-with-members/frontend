'use client';

import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';

import CalendarIcon from '@/components/icon/calendar';
import EventIcon from '@/components/icon/event';
import PenIcon from '@/components/icon/pen';
import ProfileIcon from '@/components/icon/profile';
import NavBar from '@/components/nav-bar';
import { ScrollContext } from '@/contexts/scroll';
import cn from '@/lib/cn';
import { defaultUser } from '@/lib/constants';
import { userQueryOption } from '@/lib/query-data';
import { TabActiveType } from '@/lib/types';
import { myPageTabActive, myPageTitle } from '@/lib/utils';
import { ProgressLink } from '@/navigation';
import { IconChevronLeft } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';

export default function TabLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [tabActive, setTabActive] = useState<TabActiveType>(
    myPageTabActive(pathname),
  );

  const { scrollContainerRef } = useContext(ScrollContext);

  const router = useRouter();
  const t = useTranslations('mypage');

  const { data: user } = useQuery({
    ...userQueryOption,
  });

  const pageTitle = myPageTitle(tabActive, t);

  useEffect(() => {
    setTabActive(myPageTabActive(pathname));
  }, [pathname]);

  return (
    <>
      {/* Mobile */}
      <div className="block md:hidden">
        {/* Header */}
        <header>
          <nav className="h-[4rem]">
            <div className="fixed z-50 flex h-[4rem] w-full justify-center bg-gray-00 px-4">
              <div className="mx-auto grid w-full max-w-screen-md grid-cols-3">
                <div className="flex items-center justify-start">
                  <button onClick={() => router.back()}>
                    <IconChevronLeft size={24} />
                  </button>
                </div>
                <h1 className="flex items-center justify-center whitespace-nowrap text-gray-90 text-lg-300">
                  {pageTitle}
                </h1>
                <div className="flex items-center justify-end">
                  {tabActive === 'schedules' && (
                    <ProgressLink href="/mypage/schedules/edit">
                      <PenIcon fill="#31333F" />
                    </ProgressLink>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </header>
        {/* Main Content */}
        <main className="pb-20">{children}</main>
      </div>

      {/* Desktop */}
      <div className="hidden min-h-screen flex-col md:flex">
        {/* Navigation Bar */}
        <NavBar user={user || defaultUser} shadow={false} />
        <div className="px-4">
          <div className="mx-auto flex w-full max-w-screen-md gap-10">
            {/* Side Tab */}
            <nav className="sticky top-[64px] h-screen border-l border-r border-gray-10 px-5 py-7">
              <ul className="flex flex-col gap-3">
                <SideTabItem
                  href="/mypage/events"
                  active={tabActive === 'events'}
                  icon={
                    <EventIcon
                      fill={tabActive === 'events' ? '#4C65E5' : '#9296AB'}
                    />
                  }
                  className="w-[10rem]"
                >
                  {t('allEvents')}
                </SideTabItem>
                <SideTabItem
                  href="/mypage/schedules"
                  active={tabActive === 'schedules'}
                  icon={
                    <CalendarIcon
                      fill={tabActive === 'schedules' ? '#4C65E5' : '#9296AB'}
                      innerFill="#FFFFFF"
                    />
                  }
                >
                  {t('mySchedule')}
                </SideTabItem>
                <SideTabItem
                  href="/mypage/profile"
                  active={tabActive === 'profile'}
                  icon={
                    <ProfileIcon
                      fill={tabActive === 'profile' ? '#4C65E5' : '#9296AB'}
                    />
                  }
                >
                  {t('profile')}
                </SideTabItem>
              </ul>
            </nav>
            {/* Main Content */}
            <main className="relative flex flex-1 flex-col gap-2 pb-20 pt-8">
              {/* Header */}
              <header className="sticky top-[64px] z-20 flex items-center justify-between bg-gray-00 py-2">
                <h1 className="text-[1.75rem] font-semibold">{pageTitle}</h1>
                {tabActive === 'schedules' && (
                  <ProgressLink href="/mypage/schedules/edit">
                    <PenIcon fill="#31333F" />
                  </ProgressLink>
                )}
              </header>
              {/* Content */}
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

function SideTabItem({
  children,
  className,
  active,
  icon,
  href,
  ...props
}: {
  active?: boolean;
  icon?: React.ReactNode;
  href: string;
} & React.HTMLAttributes<HTMLLIElement>) {
  return (
    <li
      className={cn(
        'rounded-lg bg-gray-00 text-gray-40 duration-150',
        {
          'bg-primary-00 text-primary-50': active,
          'hover:bg-primary-00 active:bg-primary-00': !active,
        },
        className,
      )}
      {...props}
    >
      <ProgressLink
        href={href}
        className="flex w-[10rem] items-center justify-start gap-2 p-3 text-md-300"
      >
        <span className="flex h-[24px] w-[24px] items-center justify-center">
          {icon}
        </span>
        <span>{children}</span>
      </ProgressLink>
    </li>
  );
}
