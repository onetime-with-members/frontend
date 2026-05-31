import { Locale } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import GuideArticleContent from '../components/GuideArticleContent';
import GuidePrevNext from '../components/GuidePrevNext';
import GuideSidebar from '../components/GuideSidebar';
import { GUIDE_SECTION_MESSAGE_KEY } from '../constants';
import {
  getAdjacentArticles,
  getGuideArticle,
  getGuideSections,
} from '../utils/articles';
import { GuideLocale } from '../types';
import NavBar from '@/components/NavBar';

export default async function GuideArticlePage({ slug }: { slug: string }) {
  const locale = (await getLocale()) as Locale & GuideLocale;
  const t = await getTranslations('guide');

  const article = getGuideArticle(slug);
  if (!article) notFound();

  const { prev, next } = getAdjacentArticles(slug);

  const sections = getGuideSections().map((section) => ({
    id: section.id,
    title: t(`sections.${GUIDE_SECTION_MESSAGE_KEY[section.id]}`),
    articles: section.articles.map(({ slug, title }) => ({
      slug,
      title: title[locale],
    })),
  }));

  const sectionTitle = t(`sections.${GUIDE_SECTION_MESSAGE_KEY[article.section]}`);

  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="mx-auto flex w-full max-w-screen-lg flex-col gap-8 px-4 py-8 md:flex-row md:gap-12 md:py-12">
        <GuideSidebar
          sections={sections}
          title={t('nav.title')}
          activeSlug={slug}
        />
        <main className="min-w-0 flex-1">
          <p className="text-sm-300 text-primary-50">{sectionTitle}</p>
          <article className="markdown-body mt-2 bg-transparent">
            <h1>{article.title[locale]}</h1>
            <GuideArticleContent markdown={article.body[locale]} />
          </article>
          <GuidePrevNext
            prev={prev ? { slug: prev.slug, title: prev.title[locale] } : null}
            next={next ? { slug: next.slug, title: next.title[locale] } : null}
            prevLabel={t('prev')}
            nextLabel={t('next')}
          />
        </main>
      </div>
    </div>
  );
}
