import { useTranslations } from 'next-intl';

export default function SettingHeader() {
  const t = useTranslations('profile');

  return (
    <header className="px-4 py-1">
      <h1 className="text-gray-80 title-sm-300">{t('service')}</h1>
    </header>
  );
}
