import { useTranslations } from 'next-intl';

import { Link } from '@/navigation';
import { IconPlus } from '@tabler/icons-react';

export default function EmptyMyEvent() {
  const t = useTranslations('myEvents');

  return (
    <div className="flex h-full translate-y-14 flex-col items-center justify-center gap-8 px-4 md:translate-y-0 md:justify-start md:py-12">
      <div className="text-center text-gray-90 text-lg-200">
        {t('empty.title')}
      </div>
      <Link
        href="/events/new"
        className="flex items-center gap-1 rounded-full bg-primary-40 px-6 py-3 text-gray-00"
      >
        <span className="text-md-200">{t('empty.button')}</span>
        <span>
          <IconPlus size={20} />
        </span>
      </Link>
    </div>
  );
}
