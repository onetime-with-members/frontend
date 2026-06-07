import { getGuideSectionTitle } from '@/features/guide/utils/sections';
import { GuideArticleMeta } from '@/features/guide/types';
import cn from '@/lib/cn';
import { ProgressLink } from '@/navigation';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function GuideNavLink({
  article,
  direction,
}: {
  article: GuideArticleMeta;
  direction: 'prev' | 'next';
}) {
  const locale = await getLocale();
  const t = await getTranslations('guide.components.GuidePrevNext');

  return (
    <ProgressLink
      href={`/guide/${article.slug}`}
      className={cn(
        'flex max-w-[48%] flex-1 flex-col gap-1 rounded-xl border border-gray-10 p-4 hover:bg-gray-05',
        direction === 'next' && 'items-end text-right',
      )}
    >
      <span className="flex items-center gap-1 text-gray-40 text-sm-100">
        {direction === 'prev' && <IconChevronLeft size={14} />}
        {direction === 'prev' ? t('prev') : t('next')}
        {direction === 'next' && <IconChevronRight size={14} />}
      </span>
      <span className="text-gray-90 text-md-300">{article.title[locale]}</span>
      <span className="text-gray-40 text-sm-100">
        {getGuideSectionTitle(article.section, locale)}
      </span>
    </ProgressLink>
  );
}
