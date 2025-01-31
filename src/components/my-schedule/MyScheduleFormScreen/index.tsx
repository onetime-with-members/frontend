import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BackButtonAlert from '@/components/alert/BackButtonAlert';
import MyTimeBlockBoard from '@/components/time-block-board/MyTimeBlockBoard';
import cn from '@/utils/cn';
import { IconX } from '@tabler/icons-react';

interface MyScheduleFormScreenProps {
  mode: 'create' | 'edit';
}

export default function MyScheduleFormScreen({
  mode,
}: MyScheduleFormScreenProps) {
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

  const mySchedules = [
    {
      time_point: '월',
      times: ['08:00', '08:30', '09:00'],
    },
    {
      time_point: '화',
      times: ['10:00', '10:30', '11:00'],
    },
    {
      time_point: '수',
      times: ['14:00', '14:30', '15:00'],
    },
    {
      time_point: '목',
      times: ['16:00', '16:30', '17:00'],
    },
    {
      time_point: '금',
      times: ['18:00', '18:30', '19:00'],
    },
    {
      time_point: '토',
      times: ['20:00', '20:30', '21:00'],
    },
    {
      time_point: '일',
      times: ['22:00', '22:30', '23:00'],
    },
  ];

  return (
    <>
      <div className="flex flex-col">
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
                    className={cn('cursor-pointer text-primary-40 text-md-300')}
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
            <MyTimeBlockBoard
              mode={mode}
              mySchedules={mySchedules}
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
