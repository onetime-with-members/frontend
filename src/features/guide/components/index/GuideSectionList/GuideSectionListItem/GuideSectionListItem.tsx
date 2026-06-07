import { getLocale } from 'next-intl/server';

import { GuideArticleMeta } from '@/features/guide/types';
import { ProgressLink } from '@/navigation';

export default async function GuideSectionListItem({
  article,
}: {
  article: GuideArticleMeta;
}) {
  const locale = await getLocale();

  return (
    <li>
      <ProgressLink
        href={`/guide/${article.slug}`}
        className="flex flex-col gap-1 rounded-xl border border-gray-10 p-4 hover:bg-gray-05"
      >
        <span className="text-gray-90 text-md-300">
          {article.title[locale]}
        </span>
        <span className="text-gray-50 text-sm-100">
          {article.description[locale]}
        </span>
      </ProgressLink>
    </li>
  );
}
