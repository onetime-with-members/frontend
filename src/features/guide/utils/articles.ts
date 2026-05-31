import { articles } from './article-registry';
import { GUIDE_SECTION_ORDER } from '../constants';
import { AdjacentArticles, GuideArticle, GuideSection } from '../types';

export const guideArticles: GuideArticle[] = [...articles].sort((a, b) => {
  const sectionDiff =
    GUIDE_SECTION_ORDER.indexOf(a.section) -
    GUIDE_SECTION_ORDER.indexOf(b.section);
  return sectionDiff !== 0 ? sectionDiff : a.order - b.order;
});

export const guideSlugs: string[] = guideArticles.map(({ slug }) => slug);

export function getGuideArticle(slug: string): GuideArticle | undefined {
  return guideArticles.find((article) => article.slug === slug);
}

export function getGuideSections(): GuideSection[] {
  return GUIDE_SECTION_ORDER.map((id) => ({
    id,
    articles: guideArticles.filter((article) => article.section === id),
  })).filter((section) => section.articles.length > 0);
}

export function getAdjacentArticles(slug: string): AdjacentArticles {
  const index = guideArticles.findIndex((article) => article.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? guideArticles[index - 1] : null,
    next: index < guideArticles.length - 1 ? guideArticles[index + 1] : null,
  };
}
