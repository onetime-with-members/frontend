import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from '../api/axios';
import MyScheduleBottomSheet from '../components/MyScheduleBottomSheet';
import MyTimeBlockBoard from '../components/MyTimeBlockBoard';
import { IconX } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';

export default function MyScheduleCreate() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['fixed-schedules'],
    queryFn: async () => {
      const res = await axios.get('/fixed-schedules');
      return res.data;
    },
  });

  const mySchedules = data?.data;

  function handleBottomSheetOpen() {
    setIsBottomSheetOpen(true);
  }

  function handleBottomSheetClose() {
    setIsBottomSheetOpen(false);
  }

  function handleCloseButtonClick() {
    navigate(-1);
  }

  if (isLoading || mySchedules === undefined) return <></>;

  return (
    <div className="flex flex-col gap-4">
      <nav className="h-[64px]">
        <div className="fixed z-10 flex w-full flex-col justify-center bg-primary-00">
          <div className="flex justify-center px-4 text-center">
            <div className="grid h-[4rem] w-full max-w-screen-sm grid-cols-3">
              <div className="flex items-center justify-start">
                <button onClick={handleCloseButtonClick}>
                  <IconX size={24} />
                </button>
              </div>
              <div className="flex items-center justify-center text-gray-90 text-lg-300">
                내 스케줄
              </div>
              <div className="flex items-center justify-end">
                <button
                  className="text-primary-40 text-md-300"
                  onClick={handleBottomSheetOpen}
                >
                  완료
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="px-4 pb-24">
        <div className="mx-auto max-w-screen-sm">
          <MyTimeBlockBoard mode="edit" mySchedules={mySchedules} />
        </div>
        {isBottomSheetOpen && (
          <MyScheduleBottomSheet onClose={handleBottomSheetClose} />
        )}
      </main>
    </div>
  );
}
