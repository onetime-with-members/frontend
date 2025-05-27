import { useTranslations } from 'next-intl';

import { TabActiveType } from '../MyPageLayout';
import SideTabItem from './SideTabItem/SideTabItem';
import CalendarIcon from '@/components/icon/calendar';
import EventIcon from '@/components/icon/event';
import ProfileIcon from '@/components/icon/profile';

interface SideTabContentForDesktopProps {
  tabActive: TabActiveType;
}

export default function SideTabContentForDesktop({
  tabActive,
}: SideTabContentForDesktopProps) {
  const t = useTranslations('mypage');

  return (
    <nav className="sticky top-[64px] h-screen border-l border-r border-gray-10 px-5 py-7">
      <ul className="flex flex-col gap-3">
        <SideTabItem
          href={'/mypage/events'}
          active={tabActive === 'events'}
          icon={
            <EventIcon fill={tabActive === 'events' ? '#4C65E5' : '#9296AB'} />
          }
          className="w-[10rem]"
        >
          {t('allEvents')}
        </SideTabItem>
        <SideTabItem
          href={'/mypage/schedules'}
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
          href={'/mypage/profile'}
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
