import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import ProfileSection from './ProfileSection/ProfileSection';
import SettingSection from './SettingSection/SettingSection';

export default function ProfilePage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('profile.profile')} | OneTime</title>
      </Helmet>
      <div className="flex flex-col gap-7 px-4">
        <ProfileSection />
        <SettingSection />
      </div>
    </>
  );
}
