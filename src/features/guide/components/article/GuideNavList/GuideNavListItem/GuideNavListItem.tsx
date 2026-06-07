import { getLocale } from 'next-intl/server';

import { GuideArticleMeta } from '@/features/guide/types';
import cn from '@/lib/cn';
import { ProgressLink } from '@/navigation';

export default async function GuideNavListItem({
  article,
  isActive,
}: {
  article: GuideArticleMeta;
  isActive: boolean;
}) {
  const locale = await getLocale();

  return (
    <li>
      <ProgressLink
        href={`/guide/${article.slug}`}
        className={cn(
          'block rounded-md px-2 py-1.5 text-gray-60 text-sm-100 hover:bg-gray-05 hover:text-gray-90',
          {
            'bg-primary-00 text-primary-60': isActive,
          },
        )}
      >
        {article.title[locale]}
      </ProgressLink>
    </li>
  );
}
