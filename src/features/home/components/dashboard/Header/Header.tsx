import { useTranslations } from 'next-intl';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { SKELETON_DARK_GRAY } from '@/constants';
import { ProgressLink } from '@/navigation';
import { IconChevronRight } from '@tabler/icons-react';

export default function Header({
  children,
  moreHref = '#',
  hasMore = true,
  description,
  isPending = false,
}: {
  children: React.ReactNode;
  moreHref?: string;
  hasMore?: boolean;
  description?: string;
  isPending?: boolean;
}) {
  const t = useTranslations('userDashboard');

  return (
    <SkeletonTheme baseColor={SKELETON_DARK_GRAY} borderRadius={9999}>
      <header className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-gray-90 title-sm-300">
            {!isPending ? children : <Skeleton width={200} height={30} />}
          </h2>
          {hasMore && (
            <ProgressLink
              href={moreHref}
              className="flex items-center text-gray-50"
            >
              {isPending ? (
                <Skeleton width={50} height={24} />
              ) : (
                <>
                  <span>{t('more')}</span>
                  <span>
                    <IconChevronRight />
                  </span>
                </>
              )}
            </ProgressLink>
          )}
        </div>
        {description && (
          <p className="text-gray-40 text-sm-200">
            {!isPending ? description : <Skeleton width={300} />}
          </p>
        )}
      </header>
    </SkeletonTheme>
  );
}
