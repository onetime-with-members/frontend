import { useTranslations } from 'next-intl';

import { ProgressLink } from '@/navigation';
import { IconBook2 } from '@tabler/icons-react';

export default function GuideLink() {
  const t = useTranslations('setUp.components.Footer');

  return (
    <ProgressLink href="/guide" className="flex items-center gap-1 text-gray-00">
      <span aria-hidden="true">
        <IconBook2 size={16} />
      </span>
      <span className="text-sm-300">{t('userGuide')}</span>
    </ProgressLink>
  );
}
