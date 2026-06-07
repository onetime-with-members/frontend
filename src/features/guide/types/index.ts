import { Locale } from 'next-intl';

import { GUIDE_SECTIONS } from '../constants';

export type LocalizedText = Record<Locale, string>;

export type GuideSectionId = (typeof GUIDE_SECTIONS)[number]['id'];

export interface GuideSectionMeta {
  id: GuideSectionId;
  title: LocalizedText;
}

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

export interface GuideSection extends GuideSectionMeta {
  articles: GuideArticleMeta[];
}

export interface GuideTocItem {
  id: string;
  text: string;
}
