import { useTranslation } from 'react-i18next';

import { TabActiveType } from '../MyPageLayout';
import SideTabItem from './SideTabItem/SideTabItem';
import CalendarIcon from '@/components/icon/CalendarIcon';
import EventIcon from '@/components/icon/EventIcon';
import ProfileIcon from '@/components/icon/ProfileIcon';

interface SideTabContentForDesktopProps {
  tabActive: TabActiveType;
}

export default function SideTabContentForDesktop({
  tabActive,
}: SideTabContentForDesktopProps) {
  const { t } = useTranslation();

  return (
    <nav className="sticky top-[64px] h-screen border-l border-r border-gray-10 px-5 py-7">
      <ul className="flex flex-col gap-3">
        <SideTabItem
          to={'/mypage/events'}
          icon={
            <EventIcon fill={tabActive === 'events' ? '#4C65E5' : '#9296AB'} />
          }
          className="w-[10rem]"
          active={tabActive === 'events'}
        >
          {t('common.joinedEvents')}
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
          {t('common.mySchedule')}
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
          {t('common.profileInfo')}
        </SideTabItem>
      </ul>
    </nav>
  );
}
