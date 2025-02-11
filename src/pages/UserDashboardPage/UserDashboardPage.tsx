import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import BottomButtonForMobile from './BottomButtonForMobile/BottomButtonForMobile';
import MyEventSection from './MyEventSection/MyEventSection';
import MyScheduleSection from './MyScheduleSection/MyScheduleSection';
import TopNavBar from './TopNavBar/TopNavBar';
import TopToolbarForDesktop from './TopToolbarForDesktop/TopToolbarForDesktop';
import { AppDispatch } from '@/store';
import { cleanUpSleepTime, getSleepTime } from '@/store/sleep-time';

export default function UserDashboardPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getSleepTime());

    return () => {
      dispatch(cleanUpSleepTime());
    };
  }, []);

  return (
    <div className="flex flex-col">
      <TopNavBar />
      <main className="mx-auto w-full max-w-[calc(768px+2rem)]">
        <TopToolbarForDesktop />
        <div className="flex flex-col gap-14 bg-gray-05 px-4 pb-20 pt-6 md:px-6">
          <MyEventSection />
          <MyScheduleSection />
        </div>
        <BottomButtonForMobile />
      </main>
    </div>
  );
}
