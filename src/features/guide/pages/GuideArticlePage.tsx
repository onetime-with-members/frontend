import { Locale } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import GuideArticleContent from '../components/GuideArticleContent';
import GuideMobileNav from '../components/GuideMobileNav';
import GuidePrevNext from '../components/GuidePrevNext';
import GuideSidebar from '../components/GuideSidebar';
import GuideToc from '../components/GuideToc';
import { GUIDE_SECTION_MESSAGE_KEY } from '../constants';
import {
  getAdjacentArticles,
  getGuideArticle,
  getGuideSections,
} from '../utils/articles';
import { extractHeadings } from '../utils/toc';
import { GuideLocale, GuideSectionId } from '../types';
import NavBar from '@/components/NavBar';
import '../styles/guide-article.css';

export default async function GuideArticlePage({ slug }: { slug: string }) {
  const locale = (await getLocale()) as Locale & GuideLocale;
  const t = await getTranslations('guide');

  const article = getGuideArticle(slug);
  if (!article) notFound();

  const { prev, next } = getAdjacentArticles(slug);

  const sectionTitleOf = (id: GuideSectionId) =>
    t(`sections.${GUIDE_SECTION_MESSAGE_KEY[id]}`);

  const headings = extractHeadings(article.body[locale]);

  const sections = getGuideSections().map((section) => ({
    id: section.id,
    title: t(`sections.${GUIDE_SECTION_MESSAGE_KEY[section.id]}`),
    articles: section.articles.map(({ slug, title }) => ({
      slug,
      title: title[locale],
    })),
  }));

  const sectionTitle = sectionTitleOf(article.section);

  return (
    <div className="flex flex-col">
      <NavBar shadow={false} />
      <GuideMobileNav
        sections={sections}
        navTitle={t('nav.title')}
        buttonLabel={t('nav.menu')}
        sectionTitle={sectionTitle}
        articleTitle={article.title[locale]}
        activeSlug={slug}
      />
      <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-8 px-4 py-8 md:flex-row md:gap-12 md:py-12">
        <GuideSidebar sections={sections} activeSlug={slug} />
        <main className="min-w-0 flex-1 md:max-w-[680px]">
          <p className="text-sm-300 text-primary-50">{sectionTitle}</p>
          <h1 className="mt-2 text-[2rem] font-bold leading-tight tracking-tight text-gray-90">
            {article.title[locale]}
          </h1>
          <p className="mb-9 mt-3 text-[1.0625rem] leading-relaxed text-gray-50">
            {article.description[locale]}
          </p>
          <article className="markdown-body guide-markdown bg-transparent">
            <GuideArticleContent markdown={article.body[locale]} />
          </article>
          <GuidePrevNext
            prev={
              prev
                ? {
                    slug: prev.slug,
                    title: prev.title[locale],
                    section: sectionTitleOf(prev.section),
                  }
                : null
            }
            next={
              next
                ? {
                    slug: next.slug,
                    title: next.title[locale],
                    section: sectionTitleOf(next.section),
                  }
                : null
            }
            prevLabel={t('prev')}
            nextLabel={t('next')}
          />
        </main>
        <GuideToc items={headings} title={t('toc.title')} />
      </div>
    </div>
  );
}
