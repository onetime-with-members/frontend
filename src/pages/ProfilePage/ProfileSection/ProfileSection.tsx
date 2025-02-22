import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Avatar from '@/components/avatar/Avatar/Avatar';
import GrayButton from '@/pages/ProfilePage/ProfileSection/GrayButton/GrayButton';
import { useUserQuery } from '@/queries/user.queries';

export default function ProfileSection() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: user } = useUserQuery();

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
          <div className="text-gray-80 title-sm-300">{user?.nickname}</div>
          <div className="text-gray-40 text-sm-200">{user?.email}</div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <GrayButton onClick={handleProfileEditButtonClick}>
          {t('profile.editProfile')}
        </GrayButton>
        <GrayButton onClick={handleLogoutButtonClick}>
          {t('profile.logout')}
        </GrayButton>
      </div>
    </section>
  );
}
