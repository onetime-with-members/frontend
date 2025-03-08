'use client';

import { deleteCookie } from 'cookies-next';
import { useTranslations } from 'next-intl';

import GrayButton from './GrayButton/GrayButton';
import Avatar from '@/components/avatar/Avatar/Avatar';
import { useUserQuery } from '@/queries/user.queries';
import { useRouter } from 'next/navigation';

export default function ProfileSection() {
  const router = useRouter();
  const t = useTranslations();

  const { data: user } = useUserQuery();

  function handleProfileEditButtonClick() {
    router.push('/mypage/profile/edit');
  }

  function handleLogoutButtonClick() {
    deleteCookie('access-token');
    router.push('/');
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
