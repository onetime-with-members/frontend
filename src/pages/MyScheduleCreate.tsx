import { useNavigate } from 'react-router-dom';

import MyScheduleActionButton from '../components/MyScheduleActionButton';
import Button from '../components/button/Button';
import Input from '../components/form-control/input/Input';
import { IconX } from '@tabler/icons-react';

export default function MyScheduleCreate() {
  const navigate = useNavigate();

  function handleCloseButtonClick() {
    navigate(-1);
  }

  return (
    <div>
      <nav className="h-[64px]">
        <div className="fixed flex w-full flex-col justify-center bg-primary-00">
          <div className="flex justify-center px-4 text-center">
            <div className="grid h-[4rem] w-full max-w-screen-sm grid-cols-3">
              <div className="flex items-center justify-start">
                <button>
                  <IconX size={24} />
                </button>
              </div>
              <div className="flex items-center justify-center text-gray-90 text-lg-300">
                내 스케줄
              </div>
              <div className="flex items-center justify-end">
                <button className="text-primary-40 text-md-300">완료</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="fixed left-0 top-0 flex h-full w-full items-end justify-center bg-gray-90 bg-opacity-30">
        <div className="w-full max-w-screen-sm rounded-tl-3xl rounded-tr-3xl bg-gray-00 px-4 py-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h2 className="pl-2 text-gray-90 text-lg-200">스케줄 설정</h2>
              <button onClick={handleCloseButtonClick}>
                <IconX size={24} className="text-gray-80" />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <Input placeholder="스케줄의 이름은 무엇인가요?" />
                <div className="flex items-center gap-4">
                  <MyScheduleActionButton action="edit" />
                  <MyScheduleActionButton action="delete" />
                </div>
              </div>
              <Button>저장</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
