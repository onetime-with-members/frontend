export type GuideLocale = 'ko' | 'en';

export type GuideSectionId = 'tutorial' | 'use-case';

export type LocalizedText = Record<GuideLocale, string>;

export interface GuideArticle {
  slug: string;
  section: GuideSectionId;
  order: number;
  title: LocalizedText;
  description: LocalizedText;
  body: LocalizedText;
}

export interface GuideSection {
  id: GuideSectionId;
  articles: GuideArticle[];
}

export interface AdjacentArticles {
  prev: GuideArticle | null;
  next: GuideArticle | null;
}

export interface GuideTocItem {
  id: string;
  text: string;
}

export interface ParsedMarkdown {
  title: string;
  description: string;
  body: string;
}

export interface ArticleSource {
  slug: string;
  section: GuideSectionId;
  order: number;
  ko: string;
  en: string;
}
