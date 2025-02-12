import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import SleepTimeUI from './SleepTimeUI/SleepTimeUI';
import MyTimeBlockBoard from '@/components/time-block-board/MyTimeBlockBoard/MyTimeBlockBoard';
import { AppDispatch } from '@/store';
import { getFixedSchedules } from '@/store/fixedSchedulesSlice';
import { getSleepTime } from '@/store/sleepTimeSlice';

export default function MySchedulePage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getFixedSchedules());
    dispatch(getSleepTime());
  }, []);

  return (
    <>
      <Helmet>
        <title>내 스케줄 | OneTime</title>
      </Helmet>

      <div className="mx-auto w-full max-w-screen-md pb-32">
        <SleepTimeUI />
        <MyTimeBlockBoard
          mode="view"
          backgroundColor="white"
          className="bg-gray-05 pb-16 pl-2 pr-3"
          topDateGroupClassName="sticky z-10 bg-gray-05 top-[120px] md:top-[178px]"
        />
      </div>
    </>
  );
}
