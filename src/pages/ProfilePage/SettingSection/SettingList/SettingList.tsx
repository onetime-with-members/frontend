import { useTranslation } from 'react-i18next';

import SettingItem from './SettingItem/SettingItem';

export default function SettingList() {
  const { t } = useTranslation();

  return (
    <ul>
      <SettingItem href="/policy/service">
        {t('profile.termsOfService')}
      </SettingItem>
      <SettingItem href="/policy/privacy">
        {t('profile.privacyPolicy')}
      </SettingItem>
      <SettingItem>
        <span>{t('profile.version')}</span>
        <span className="text-primary-40">v 1.4.4</span>
      </SettingItem>
      <SettingItem href="/withdraw" className="text-gray-30 text-sm-200">
        {t('profile.withdraw')}
      </SettingItem>
    </ul>
  );
}
