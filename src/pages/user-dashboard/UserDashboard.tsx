import BottomButtonForMobile from './components/BottomButtonForMobile';
import FixedScheduleSection from './components/FixedScheduleSection';
import MyEventSection from './components/MyEventSection';
import TopNavBar from './components/TopNavBar';
import TopToolbarForDesktop from './components/TopToolbarForDesktop';

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
