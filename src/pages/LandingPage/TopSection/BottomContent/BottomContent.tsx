import { useNavigate } from 'react-router-dom';

import Button from '@/components/button/Button/Button';

export default function BottomContent() {
  const navigate = useNavigate();

  function handleStartButtonClick() {
    navigate('/events/new');
  }

  return (
    <>
      <div className="mt-11 flex flex-col items-center gap-3 px-4">
        <h1 className="text-[1.75rem] font-bold leading-normal text-gray-80">
          일정을 쉽고 빠르게
        </h1>
        <p className="text-center text-gray-40 text-md-200">
          링크 공유 한 번으로 여러 사람과 일정을{' '}
          <br className="hidden min-[300px]:block" />
          정리하고, 가장 적합한 시간을 찾아보세요.
        </p>
      </div>
      <div className="sticky bottom-4 z-30 mx-auto mt-9 flex w-full items-center justify-center px-4">
        <Button variant="black" onClick={handleStartButtonClick}>
          시작하기
        </Button>
      </div>
    </>
  );
}
