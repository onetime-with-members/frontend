'use client';

import BottomButtonForMobile from '../components/dashboard/BottomButtonForMobile';
import DashboardNavBar from '../components/dashboard/DashboardNavBar';
import MyScheduleSection from '../components/dashboard/MyScheduleSection';
import RecentEventsSection from '../components/dashboard/RecentEventsSection';
import TopToolbarForDesktop from '../components/dashboard/TopToolbarForDesktop';
import BarBanner from '@/components/BarBanner';

export default function DashboardPage() {
  return (
    <div className="flex flex-col">
      <DashboardNavBar />
      <main className="mx-auto w-full max-w-[calc(768px+2rem)]">
        <TopToolbarForDesktop />
        <BarBanner
          className="h-[56px]"
          innnerClassName="fixed max-w-[calc(768px+2rem)] w-full z-30"
        />
        <div className="flex flex-col gap-14 bg-gray-05 px-4 pb-20 pt-6 md:px-6">
          <RecentEventsSection />
          <MyScheduleSection />
        </div>
        <BottomButtonForMobile />
      </main>
    </div>
  );
}
