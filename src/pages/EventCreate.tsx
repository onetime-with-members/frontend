import { useNavigate } from 'react-router-dom';

import DateSection from '../components/section/event-create/DateSection';
import TimeSection from '../components/section/event-create/TimeSection';
import TitleSection from '../components/section/event-create/TitleSection';

export default function EventCreate() {
  const navigate = useNavigate();

  function handleSubmit() {
    navigate('/schedules/1');
  }

  return (
    <div className="px-4">
      <main className="mx-auto max-w-screen-sm pb-40 pt-8">
        <div className="flex flex-col gap-16">
          <TitleSection />
          <TimeSection />
          <DateSection />
        </div>
        <div className="fixed bottom-6 left-0 flex w-full justify-center px-4">
          <button
            className="title-sm-200 h-16 w-full max-w-screen-sm rounded-2xl bg-gray-90 text-gray-00"
            onClick={handleSubmit}
          >
            이벤트 생성하기
          </button>
        </div>
      </main>
    </div>
  );
}
