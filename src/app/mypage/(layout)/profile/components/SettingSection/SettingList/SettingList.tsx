import { useTranslations } from 'next-intl';

import SettingItem from './SettingItem/SettingItem';
import LanguageDropdown from '@/components/dropdown/LanguageDropdown/LanguageDropdown';

export default function SettingList() {
  const t = useTranslations('profile');

  return (
    <div className="flex flex-col gap-12">
      <ul>
        <SettingItem href="https://www.kusitms.com/" external>
          {t('report')}
        </SettingItem>
        <SettingItem href="/policy/service">{t('termsOfService')}</SettingItem>
        <SettingItem href="/policy/privacy">{t('privacyPolicy')}</SettingItem>
        <SettingItem>
          <span>{t('version')}</span>
          <span className="text-primary-40">v 1.4.5</span>
        </SettingItem>
        <SettingItem href="/withdraw" className="text-gray-30 text-sm-200">
          {t('withdraw')}
        </SettingItem>
      </ul>

      <div className="px-6">
        <LanguageDropdown />
      </div>
    </div>
  );
}
