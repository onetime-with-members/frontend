import BottomButtonForMobile from './BottomButtonForMobile';
import FixedScheduleSection from './FixedScheduleSection';
import MyEventSection from './MyEventSection';
import TopNavBar from './TopNavBar';
import TopToolbarForDesktop from './TopToolbarForDesktop';

export default function UserDashboard() {
  return (
    <div className="flex flex-col">
      <TopNavBar />
      <main className="mx-auto w-full max-w-[calc(768px+2rem)]">
        <TopToolbarForDesktop />
        <div className="flex flex-col gap-14 bg-gray-05 px-6 pb-20 pt-6">
          <MyEventSection />
          <FixedScheduleSection />
        </div>
        <BottomButtonForMobile />
      </main>
    </div>
  );
}
