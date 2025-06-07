'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import CalendarIcon from '@/components/icon/calendar';
import EventIcon from '@/components/icon/event';
import ProfileIcon from '@/components/icon/profile';
import cn from '@/lib/cn';
import { TabActiveType } from '@/lib/types';
import { myPageTabActive } from '@/lib/utils';
import { Link } from '@/navigation';
import { usePathname } from 'next/navigation';

export default function SideTab() {
  const [tabActive, setTabActive] = useState<TabActiveType>(null);

  const pathname = usePathname();

  const t = useTranslations('mypage');

  useEffect(() => {
    setTabActive(myPageTabActive(pathname));
  }, [pathname]);

  return (
    <nav className="sticky top-[64px] h-screen border-l border-r border-gray-10 px-5 py-7">
      <ul className="flex flex-col gap-3">
        <SideTabItem
          href="/mypage/events"
          active={tabActive === 'events'}
          icon={
            <EventIcon fill={tabActive === 'events' ? '#4C65E5' : '#9296AB'} />
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
      <Link
        href={href}
        className="flex w-[10rem] items-center justify-start gap-2 p-3 text-md-300"
      >
        <span className="flex h-[24px] w-[24px] items-center justify-center">
          {icon}
        </span>
        <span>{children}</span>
      </Link>
    </li>
  );
}
