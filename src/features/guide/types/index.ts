export type GuideLocale = 'ko' | 'en';

export type GuideSectionId = 'tutorial' | 'my-schedule';

export type LocalizedText = Record<GuideLocale, string>;

export interface GuideArticleMeta {
  slug: string;
  section: GuideSectionId;
  order: number;
  title: LocalizedText;
  description: LocalizedText;
}

export interface GuideArticle extends GuideArticleMeta {
  body: LocalizedText;
}

export interface GuideSectionMeta {
  id: GuideSectionId;
  title: LocalizedText;
}

export interface GuideSection extends GuideSectionMeta {
  articles: GuideArticleMeta[];
}

export interface AdjacentArticles {
  prev: GuideArticleMeta | null;
  next: GuideArticleMeta | null;
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
