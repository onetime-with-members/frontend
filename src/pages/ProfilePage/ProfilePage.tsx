import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import ProfileSection from './ProfileSection/ProfileSection';
import SettingSection from './SettingSection/SettingSection';
import { UserType } from '@/types/user.type';
import axios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

export default function ProfilePage() {
  const { t } = useTranslation();

  const { isPending: isUserPending, data: user } = useQuery<UserType>({
    queryKey: ['users', 'profile'],
    queryFn: async () => {
      const res = await axios.get('/users/profile');
      return res.data.payload;
    },
  });

  if (isUserPending || user === undefined) {
    return <></>;
  }

  return (
    <>
      <Helmet>
        <title>{t('profile.profile')} | OneTime</title>
      </Helmet>
      <div className="flex flex-col gap-7 px-4">
        <ProfileSection user={user} />
        <SettingSection />
      </div>
    </>
  );
}
