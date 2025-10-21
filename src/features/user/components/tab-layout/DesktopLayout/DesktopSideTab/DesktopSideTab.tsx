import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import SideTabItem from './SideTabItem';
import CalendarIcon from '@/components/icon/CalendarIcon';
import EventIcon from '@/components/icon/EventIcon';
import ProfileIcon from '@/components/icon/ProfileIcon';
import { MyPageTabContext } from '@/features/user/contexts/MyPageTabContext';

export default function DesktopSideTab() {
  const { tabActive } = useContext(MyPageTabContext);

  const t = useTranslations('mypage');

  return (
    <nav className="sticky top-[64px] h-screen border-l border-r border-gray-10 px-5 py-7">
      <ul className="flex flex-col gap-3">
        <SideTabItem
          href="/mypage/events"
          active={tabActive === 'events'}
          icon={<EventIcon />}
          className="w-[10rem]"
        >
          {t('allEvents')}
        </SideTabItem>
        <SideTabItem
          href="/mypage/schedules"
          active={tabActive === 'schedules'}
          icon={<CalendarIcon />}
        >
          {t('mySchedule')}
        </SideTabItem>
        <SideTabItem
          href="/mypage/profile"
          active={tabActive === 'profile'}
          icon={<ProfileIcon />}
        >
          {t('profile')}
        </SideTabItem>
      </ul>
    </nav>
  );
}
