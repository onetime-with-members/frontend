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
        <div className="fixed flex w-full flex-col justify-center bg-gray-00">
          <div className="flex justify-center px-4 text-center">
            <div className="grid h-[4rem] w-full max-w-screen-sm grid-cols-3">
              <div className="flex items-center justify-start">
                <button onClick={handleBackButtonClick}>
                  <IconChevronLeft size={24} />
                </button>
              </div>
              <div className="flex items-center justify-center text-gray-90 text-lg-300">
                마이타임
              </div>
              <div className="flex items-center justify-end">
                <Link to="/settings">
                  <IconSettingsFilled size={24} />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full max-w-screen-sm">
              <button className="w-full border-b-2 border-primary-50 px-3 py-4 text-primary-50 text-lg-200">
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
