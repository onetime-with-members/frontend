import { Locale } from 'next-intl';

import GuideArticleContent from './GuideArticleContent';
import GuideArticleHeader from './GuideArticleHeader';
import GuidePrevNext from './GuidePrevNext';
import { GuideLocale } from '@/features/guide/types';
import {
  getGuideArticleBody,
  getGuideArticleMeta,
} from '@/features/guide/utils/articles';
import { getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function GuideArticleMain({ slug }: { slug: string }) {
  const locale = (await getLocale()) as Locale & GuideLocale;

  const meta = getGuideArticleMeta(slug);
  const body = getGuideArticleBody(slug);
  if (!meta || !body) notFound();

  return (
    <main className="min-w-0 flex-1 md:max-w-[680px]">
      <GuideArticleHeader article={meta} />
      <article className="markdown-body guide-markdown bg-transparent">
        <GuideArticleContent markdown={body[locale]} />
      </article>
      <GuidePrevNext slug={slug} />
    </main>
  );
}
