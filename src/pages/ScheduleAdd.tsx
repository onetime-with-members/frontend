import { useNavigate } from 'react-router-dom';

import Input from '../components/Input';
import ScheduleInputLabel from '../components/input-label/ScheduleInputLabel';
import PinPasswordInput from '../components/pin-password/PinPasswordInput';
import { IconChevronLeft } from '@tabler/icons-react';

export default function ScheduleAdd() {
  const navigate = useNavigate();

  function handleBackButtonClick() {
    navigate(-1);
  }

  return (
    <div className="px-4">
      <header className="h-[67px]">
        <div className="fixed left-0 top-0 w-full px-4">
          <div className="mx-auto grid max-w-screen-sm grid-cols-3 py-5">
            <div className="flex items-center">
              <button onClick={handleBackButtonClick}>
                <IconChevronLeft size={24} className="text-gray-80" />
              </button>
            </div>
            <h2 className="text-lg-300 text-center text-gray-90">정보 입력</h2>
          </div>
        </div>
      </header>
      <main className="mx-auto mt-4 max-w-screen-sm">
        <div>
          <div>
            <ScheduleInputLabel htmlFor="name" required>
              이름
            </ScheduleInputLabel>
            <Input className="mt-2" id="name" placeholder="이름" />
          </div>
          <div className="mt-12">
            <ScheduleInputLabel htmlFor="pin" required>
              PIN 번호
            </ScheduleInputLabel>
            <PinPasswordInput className="mt-2" inputId="pin" />
          </div>
        </div>
        <div className="fixed bottom-4 left-0 w-full px-4">
          <div className="mx-auto w-full max-w-screen-sm">
            <button className="title-sm-200 w-full rounded-2xl bg-primary-50 px-4 py-4 text-gray-00">
              다음
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
