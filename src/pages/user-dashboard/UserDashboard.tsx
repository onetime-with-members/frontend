import { User } from '../../types/user.type';
import BottomButtonForMobile from './components/BottomButtonForMobile';
import FixedScheduleSection from './components/FixedScheduleSection';
import MyEventSection from './components/MyEventSection';
import TopNavBar from './components/TopNavBar';
import TopToolbar from './components/TopToolbar';

interface UserDashboardProps {
  user: User;
}

export default function UserDashboard({ user }: UserDashboardProps) {
  return (
    <div className="flex flex-col pb-20">
      <TopNavBar />
      <main className="mx-auto w-full max-w-[calc(768px+2rem)]">
        <TopToolbar user={user} />
        <div className="flex flex-col gap-14 bg-gray-05 px-6 pt-6">
          <MyEventSection />
          <FixedScheduleSection />
        </div>
        <BottomButtonForMobile />
      </main>
    </div>
  );
}
