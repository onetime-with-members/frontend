import SideTabItem from './SideTabItem';
import CalendarIcon from '@/components/icon/CalendarIcon';
import EventIcon from '@/components/icon/EventIcon';
import ProfileIcon from '@/components/icon/ProfileIcon';

interface SideTabContentForDesktopProps {
  tabActive: string;
}

export default function SideTabContentForDesktop({
  tabActive,
}: SideTabContentForDesktopProps) {
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
          프로필 정보
        </SideTabItem>
      </ul>
    </nav>
  );
}
