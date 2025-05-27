'use client';

import BottomButtonForMobile from './BottomButtonForMobile/BottomButtonForMobile';
import MyEventSection from './MyEventSection/MyEventSection';
import MyScheduleSection from './MyScheduleSection/MyScheduleSection';
import TopNavBar from './TopNavBar/TopNavBar';
import TopToolbarForDesktop from './TopToolbarForDesktop/TopToolbarForDesktop';
import BarBanner from '@/components/bar-banner';

export default function UserDashboardPage() {
  return (
    <div className="flex flex-col">
      <TopNavBar />

      <main className="mx-auto w-full max-w-[calc(768px+2rem)]">
        <TopToolbarForDesktop />
        <BarBanner
          className="h-[56px]"
          innnerClassName="fixed max-w-[calc(768px+2rem)] w-full z-30"
        />

        <div className="flex flex-col gap-14 bg-gray-05 px-4 pb-20 pt-6 md:px-6">
          <MyEventSection />
          <MyScheduleSection />
        </div>

        <BottomButtonForMobile />
      </main>
    </div>
  );
}
