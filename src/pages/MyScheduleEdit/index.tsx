import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TopAppBar from './TopAppBar';
import BackButtonAlert from '@/components/alert/BackButtonAlert';
import MyTimeBlockBoard from '@/components/time-block-board/MyTimeBlockBoard';
import mySchedulesDefault from '@/data/ts/my-schedules';

export default function MyScheduleEdit() {
  const [isBackButtonAlertOpen, setIsBackButtonAlertOpen] = useState(false);
  const [isMyScheduleEdited, setIsMyScheduleEdited] = useState(false);

  const navigate = useNavigate();

  function handleCloseButtonClick() {
    if (isMyScheduleEdited) {
      setIsBackButtonAlertOpen(true);
    } else {
      navigate(-1);
    }
  }

  return (
    <>
      <div className="flex flex-col">
        <TopAppBar onBackButtonClick={handleCloseButtonClick} />

        <main className="px-4 pb-24">
          <div className="mx-auto max-w-screen-sm">
            <MyTimeBlockBoard
              mode="edit"
              mySchedules={mySchedulesDefault}
              topDateGroupClassName="sticky top-[64px] z-10 bg-gray-00"
              setIsEdited={setIsMyScheduleEdited}
            />
          </div>
        </main>
      </div>

      {isBackButtonAlertOpen && (
        <BackButtonAlert backHref={-1} setIsOpen={setIsBackButtonAlertOpen} />
      )}
    </>
  );
}
