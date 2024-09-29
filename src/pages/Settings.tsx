import { useNavigate } from 'react-router-dom';

import Avatar from '../components/avatar/Avatar';
import GrayButton from '../components/button/GrayButton';
import SettingList from '../components/list/setting/SettingList';
import { IconX } from '@tabler/icons-react';

export default function Settings() {
  const navigate = useNavigate();

  function handleBackButtonClick() {
    navigate(-1);
  }

  function handleLogoutButtonClick() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    location.href = '/';
  }

  return (
    <div>
      <nav className="flex justify-center px-4">
        <div className="w-full max-w-screen-sm">
          <div className="grid h-[4rem] grid-cols-3">
            <div />
            <div className="text-lg-300 flex items-center justify-center text-gray-90">
              설정
            </div>
            <div className="flex items-center justify-end">
              <button onClick={handleBackButtonClick}>
                <IconX size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex justify-center">
        <div className="w-full max-w-screen-sm">
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 px-4 pt-2">
                <Avatar size={64} />
                <div className="flex flex-col gap-1">
                  <div className="title-sm-300 text-gray-80">
                    구름구름구름구름구름
                  </div>
                  <div className="text-sm-200 text-gray-40">
                    example@gmail.com
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <GrayButton onClick={handleLogoutButtonClick}>
                  로그아웃
                </GrayButton>
              </div>
            </div>
            <div>
              <div className="px-4 py-1">
                <h1 className="title-sm-300 text-gray-80">서비스</h1>
              </div>
              <SettingList />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
