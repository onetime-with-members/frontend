import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { IconChevronRight } from '@tabler/icons-react';

interface HeaderProps {
  children: React.ReactNode;
  moreHref?: string;
  hasMore?: boolean;
}

export default function Header({
  children,
  moreHref = '#',
  hasMore = true,
}: HeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="flex items-center justify-between gap-3">
      <h2 className="text-gray-90 title-sm-300">{children}</h2>
      {hasMore && (
        <Link to={moreHref} className="flex items-center text-gray-50">
          <span>{t('userDashboard.more')}</span>
          <span>
            <IconChevronRight />
          </span>
        </Link>
      )}
    </header>
  );
}
