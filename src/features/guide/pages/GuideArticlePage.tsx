import { Locale } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import GuideArticleContent from '../components/GuideArticleContent';
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
import cn from '@/lib/cn';
import NavBar from '@/components/NavBar';

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
      <NavBar />
      <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-8 px-4 py-8 md:flex-row md:gap-12 md:py-12">
        <GuideSidebar
          sections={sections}
          title={t('nav.title')}
          activeSlug={slug}
        />
        <main className="min-w-0 flex-1 md:max-w-[680px]">
          <p className="text-sm-300 text-primary-50">{sectionTitle}</p>
          <h1 className="mt-2 text-[2rem] font-bold leading-tight tracking-tight text-gray-90">
            {article.title[locale]}
          </h1>
          <p className="mb-9 mt-3 text-[1.0625rem] leading-relaxed text-gray-50">
            {article.description[locale]}
          </p>
          <article
            className={cn(
              'markdown-body bg-transparent',
              // 시안 A에 맞춘 본문 보정: 제목 아래 밑줄 제거, 본문 색
              '[&_h2]:!mb-3 [&_h2]:!mt-10 [&_h2]:!border-0 [&_h2]:!pb-0',
              '[&_h3]:!border-0 [&_h3]:!pb-0',
              '[&_p]:!text-gray-70 [&_li]:!text-gray-70',
              // 불릿(ul): 기본 디스크 제거 + primary 작은 점
              '[&_ul]:!list-none [&_ul]:!pl-1',
              "[&_ul>li]:relative [&_ul>li]:!pl-5 [&_ul>li]:before:absolute [&_ul>li]:before:left-1 [&_ul>li]:before:top-[0.62em] [&_ul>li]:before:h-[5px] [&_ul>li]:before:w-[5px] [&_ul>li]:before:rounded-full [&_ul>li]:before:bg-primary-40 [&_ul>li]:before:content-['']",
              // 숫자(ol): 기본 마커(1.) 제거 후 카운터로 점 없는 숫자만 primary 강조
              '[&_ol]:!list-none [&_ol]:!pl-1 [&_ol]:[counter-reset:guide-ol]',
              '[&_ol>li]:relative [&_ol>li]:!pl-6 [&_ol>li]:[counter-increment:guide-ol]',
              '[&_ol>li]:before:absolute [&_ol>li]:before:left-0 [&_ol>li]:before:font-semibold [&_ol>li]:before:text-primary-50 [&_ol>li]:before:[content:counter(guide-ol)]',
            )}
          >
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
