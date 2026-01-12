import { useTranslations } from 'next-intl';

import { ProgressLink } from '@/navigation';

export default function LinkToWithdraw() {
  const t = useTranslations('policyEdit');

  return (
    <div className="flex items-center gap-1.5 px-4 text-gray-50 text-sm-200">
      <span>{t('toWithdrawText')}</span>
      <ProgressLink href="/withdraw" className="text-danger-50 text-sm-200">
        {t('toWithdrawLink')}
      </ProgressLink>
    </div>
  );
}
