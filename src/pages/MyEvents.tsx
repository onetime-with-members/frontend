import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MyEventList from '../components/list/my-event/MyEventList';
import { IconChevronLeft } from '@tabler/icons-react';

export default function MyEvents() {
  const navigate = useNavigate();

  function handleBackButtonClick() {
    navigate(-1);
  }

  useEffect(() => {
    document.body.style.backgroundColor = '#F6F7F8';

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <nav className="h-[64px]">
        <div className="fixed flex w-full flex-col justify-center bg-gray-00">
          <div className="flex justify-center px-4 text-center">
            <div className="grid h-[4rem] w-full max-w-screen-sm grid-cols-3">
              <div className="flex items-center justify-start">
                <button onClick={handleBackButtonClick}>
                  <IconChevronLeft size={24} />
                </button>
              </div>
              <div className="flex items-center justify-center text-gray-90 text-lg-300">
                참여한 이벤트
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex w-full flex-1">
        <div className="flex w-full justify-center px-4 py-5">
          <div className="w-full max-w-screen-sm">
            <MyEventList />
          </div>
        </div>
      </main>
    </div>
  );
}
