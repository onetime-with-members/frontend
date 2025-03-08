'use client';

import { useTranslations } from 'next-intl';

import SettingList from './SettingList/SettingList';

export default function SettingSection() {
  const t = useTranslations('profile');

  return (
    <section>
      <div className="px-4 py-1">
        <h1 className="text-gray-80 title-sm-300">{t('service')}</h1>
      </div>
      <SettingList />
    </section>
  );
}
