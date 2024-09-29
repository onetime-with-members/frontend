import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import MyEventList from '../components/list/my-event/MyEventList';
import { IconChevronLeft, IconSettingsFilled } from '@tabler/icons-react';

export default function MyPage() {
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
    <>
      <nav className="h-[125px]">
        <div className="fixed flex w-full justify-center bg-gray-00">
          <div className="w-full max-w-screen-sm">
            <div className="grid h-[4rem] grid-cols-3 px-4">
              <div className="flex items-center justify-start">
                <button onClick={handleBackButtonClick}>
                  <IconChevronLeft size={24} />
                </button>
              </div>
              <div className="text-lg-300 flex items-center justify-center text-gray-90">
                마이타임
              </div>
              <div className="flex items-center justify-end">
                <Link to="/settings">
                  <IconSettingsFilled size={24} />
                </Link>
              </div>
            </div>
            <div>
              <button className="text-lg-200 w-full border-b-2 border-primary-50 px-3 py-4 text-primary-50">
                참여한 이벤트
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex justify-center bg-gray-05 px-4 py-5">
        <div className="w-full max-w-screen-sm">
          <MyEventList />
        </div>
      </main>
    </>
  );
}
