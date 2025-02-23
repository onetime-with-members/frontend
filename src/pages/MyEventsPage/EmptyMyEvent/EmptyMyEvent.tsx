import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { IconPlus } from '@tabler/icons-react';

export default function EmptyMyEvent() {
  const { t } = useTranslation();

  return (
    <div className="flex h-full translate-y-14 flex-col items-center justify-center gap-8 px-4 md:translate-y-0 md:justify-start md:py-12">
      <div className="text-center text-gray-90 text-lg-200">
        {t('myEvents.empty.title')}
      </div>
      <Link
        to="/events/new"
        className="flex items-center gap-1 rounded-full bg-primary-40 px-6 py-3 text-gray-00"
      >
        <span className="text-md-200">{t('myEvents.empty.button')}</span>
        <span>
          <IconPlus size={20} />
        </span>
      </Link>
    </div>
  );
}
