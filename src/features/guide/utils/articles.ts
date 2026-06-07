import 'server-only';

import { GUIDE_SECTIONS, GUIDE_SECTION_ORDER } from '../constants';
import {
  AdjacentArticles,
  GuideArticle,
  GuideArticleMeta,
  GuideSection,
  LocalizedText,
} from '../types';
import { articles } from './article-registry';

const guideArticles: GuideArticle[] = [...articles].sort((a, b) => {
  const sectionDiff =
    GUIDE_SECTION_ORDER.indexOf(a.section) -
    GUIDE_SECTION_ORDER.indexOf(b.section);
  return sectionDiff !== 0 ? sectionDiff : a.order - b.order;
});

function toMeta(article: GuideArticle): GuideArticleMeta {
  return {
    slug: article.slug,
    section: article.section,
    order: article.order,
    title: article.title,
    description: article.description,
  };
}

export const guideSlugs: string[] = guideArticles.map(({ slug }) => slug);

export function getGuideArticleMeta(
  slug: string,
): GuideArticleMeta | undefined {
  const article = guideArticles.find((article) => article.slug === slug);
  return article && toMeta(article);
}

export function getGuideArticleBody(slug: string): LocalizedText | undefined {
  return guideArticles.find((article) => article.slug === slug)?.body;
}

export function getGuideSections(): GuideSection[] {
  return GUIDE_SECTIONS.map((section) => ({
    id: section.id,
    title: section.title,
    articles: guideArticles
      .filter((article) => article.section === section.id)
      .map(toMeta),
  })).filter((section) => section.articles.length > 0);
}

export function getAdjacentArticles(slug: string): AdjacentArticles {
  const index = guideArticles.findIndex((article) => article.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? toMeta(guideArticles[index - 1]) : null,
    next:
      index < guideArticles.length - 1
        ? toMeta(guideArticles[index + 1])
        : null,
  };
}
