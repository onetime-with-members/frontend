import { useNavigate } from 'react-router-dom';

import Avatar from '@/components/avatar/Avatar';
import GrayButton from '@/pages/ProfilePage/ProfileSection/GrayButton';
import { User } from '@/types/user.type';

interface ProfileSectionProps {
  user: User;
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  const navigate = useNavigate();

  function handleProfileEditButtonClick() {
    navigate('/mypage/profile/edit');
  }

  function handleLogoutButtonClick() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    location.href = '/';
  }

  return (
    <section className="flex flex-col gap-4 rounded-[1.25rem] border border-gray-10 p-6">
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
    </section>
  );
}
