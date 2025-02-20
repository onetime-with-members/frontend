import { useTranslation } from 'react-i18next';

import SettingList from './SettingList/SettingList';

export default function SettingSection() {
  const { t } = useTranslation();

  return (
    <section>
      <div className="px-4 py-1">
        <h1 className="text-gray-80 title-sm-300">{t('profile.service')}</h1>
      </div>
      <SettingList />
    </section>
  );
}
