import { GUIDE_SECTIONS } from '../constants';
import { GuideLocale, GuideSectionId, GuideSectionMeta } from '../types';

export function getGuideSection(id: GuideSectionId): GuideSectionMeta {
  return GUIDE_SECTIONS.find((section) => section.id === id)!;
}

export function getGuideSectionTitle(
  id: GuideSectionId,
  locale: GuideLocale,
): string {
  return getGuideSection(id).title[locale];
}
