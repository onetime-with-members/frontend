import { useNavigate } from 'react-router-dom';

import axios from '../api/axios';
import NameAvatar from '../components/avatar/NameAvatar';
import GrayButton from '../components/button/GrayButton';
import SettingList from '../components/list/setting/SettingList';
import { IconX } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';

export default function Settings() {
  const navigate = useNavigate();

  const { isPending: isUserPending, data: userData } = useQuery({
    queryKey: ['users', 'profile'],
    queryFn: async () => {
      const res = await axios.get('/users/profile');
      return res.data;
    },
  });

  const user = userData?.payload;

  function handleBackButtonClick() {
    navigate(-1);
  }

  function handleLogoutButtonClick() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    location.href = '/';
  }

  if (isUserPending || user === undefined) {
    return <></>;
  }

  return (
    <div>
      <nav className="flex justify-center px-4">
        <div className="w-full max-w-screen-sm">
          <div className="grid h-[4rem] grid-cols-3">
            <div />
            <div className="flex items-center justify-center text-gray-90 text-lg-300">
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
                <NameAvatar size={64} name={user.nickname} />
                <div className="flex flex-col gap-1">
                  <div className="text-gray-80 title-sm-300">
                    {user.nickname}
                  </div>
                  <div className="text-gray-40 text-sm-200">{user.email}</div>
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
                <h1 className="text-gray-80 title-sm-300">서비스</h1>
              </div>
              <SettingList />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
