'use client';

import BottomButtonForMobile from './BottomButtonForMobile/BottomButtonForMobile';
import MyEventSection from './MyEventSection/MyEventSection';
import MyScheduleSection from './MyScheduleSection/MyScheduleSection';
import TopNavBar from './TopNavBar/TopNavBar';
import TopToolbarForDesktop from './TopToolbarForDesktop/TopToolbarForDesktop';
import EverytimeTopBanner from '@/components/EverytimeTopBanner/EverytimeTopBanner';

export default function UserDashboardPage() {
  return (
    <div className="flex flex-col">
      <TopNavBar />
      <main className="mx-auto w-full max-w-[calc(768px+2rem)]">
        <TopToolbarForDesktop />
        <div className="flex flex-col gap-6 bg-gray-05 px-4 pb-20 pt-6 md:px-6">
          <EverytimeTopBanner />
          <div className="flex flex-col gap-14">
            <MyEventSection />
            <MyScheduleSection />
          </div>
        </div>
        <BottomButtonForMobile />
      </main>
    </div>
  );
}
