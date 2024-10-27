import { useNavigate } from 'react-router-dom';

import MyTimeBlockBoard from '../components/MyTimeBlockBoard';
import BlackFloatingBottomButton from '../components/floating-button/BlackFloatingBottomButton';
import { IconChevronLeft } from '@tabler/icons-react';

export default function MySchedules() {
  const navigate = useNavigate();

  function handleBackButtonClick() {
    navigate(-1);
  }

  function handleFLoatingButtonClick() {
    navigate('/mypage/schedules/new');
  }

  return (
    <div className="flex flex-col gap-4">
      <nav className="h-[64px]">
        <div className="fixed z-10 flex w-full flex-col justify-center bg-gray-00">
          <div className="flex justify-center px-4 text-center">
            <div className="grid h-[4rem] w-full max-w-screen-sm grid-cols-3">
              <div className="flex items-center justify-start">
                <button onClick={handleBackButtonClick}>
                  <IconChevronLeft size={24} />
                </button>
              </div>
              <div className="flex items-center justify-center text-gray-90 text-lg-300">
                내 스케줄
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="px-4">
        <div className="mx-auto w-full max-w-screen-sm pb-32">
          <MyTimeBlockBoard />
          <BlackFloatingBottomButton
            name="스케줄 추가"
            onClick={handleFLoatingButtonClick}
          />
        </div>
      </main>
    </div>
  );
}
