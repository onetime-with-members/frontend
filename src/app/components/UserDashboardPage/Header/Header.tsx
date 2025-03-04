import { useTranslations } from 'next-intl';

import { IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';

interface HeaderProps {
  children: React.ReactNode;
  moreHref?: string;
  hasMore?: boolean;
  description?: string;
}

export default function Header({
  children,
  moreHref = '#',
  hasMore = true,
  description,
}: HeaderProps) {
  const t = useTranslations('userDashboard');

  return (
    <header className="flex flex-col gap-1">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-gray-90 title-sm-300">{children}</h2>
        {hasMore && (
          <Link href={moreHref} className="flex items-center text-gray-50">
            <span>{t('more')}</span>
            <span>
              <IconChevronRight />
            </span>
          </Link>
        )}
      </div>
      {description && <p className="text-gray-40 text-sm-200">{description}</p>}
    </header>
  );
}
