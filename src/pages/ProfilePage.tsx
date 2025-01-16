import { useNavigate } from 'react-router-dom';

import Avatar from '../components/Avatar';
import GrayButton from '../components/button/GrayButton';
import SettingList from '../components/list/setting/SettingList';
import { User } from '../types/user.type';
import axios from '../utils/axios';
import { useQuery } from '@tanstack/react-query';

export default function ProfilePage() {
  const navigate = useNavigate();

  const { isPending: isUserPending, data: user } = useQuery<User>({
    queryKey: ['users', 'profile'],
    queryFn: async () => {
      const res = await axios.get('/users/profile');
      return res.data.payload;
    },
  });

  function handleProfileEditButtonClick() {
    navigate('/mypage/profile/edit');
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
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-4 rounded-[1.25rem] border border-gray-10 p-6">
        <div className="flex items-center gap-4">
          <Avatar size={64} name={user?.nickname || ''} />
          <div className="flex flex-col gap-1">
            <div className="text-gray-80 title-sm-300">{user.nickname}</div>
            <div className="text-gray-40 text-sm-200">{user.email}</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <GrayButton onClick={handleProfileEditButtonClick}>
            프로필 수정
          </GrayButton>
          <GrayButton onClick={handleLogoutButtonClick}>로그아웃</GrayButton>
        </div>
      </div>
      <div>
        <div className="px-4 py-1">
          <h1 className="text-gray-80 title-sm-300">서비스</h1>
        </div>
        <SettingList />
      </div>
    </div>
  );
}
