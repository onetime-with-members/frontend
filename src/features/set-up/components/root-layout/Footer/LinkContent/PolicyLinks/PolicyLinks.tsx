import { useTranslations } from 'next-intl';

import { ProgressLink } from '@/navigation';

export default function PolicyLinks() {
  const t = useTranslations('setUp.components.Footer');

  return (
    <div className="flex items-center gap-2 text-gray-40">
      <ProgressLink href="/policy/privacy">{t('privacyPolicy')}</ProgressLink>
      <span>|</span>
      <ProgressLink href="/policy/service">{t('termsOfService')}</ProgressLink>
    </div>
  );
}
