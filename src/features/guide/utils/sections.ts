import { Locale } from 'next-intl';

import { GUIDE_SECTIONS } from '../constants';
import { GuideSectionId, GuideSectionMeta } from '../types';

export function getGuideSection(id: GuideSectionId): GuideSectionMeta {
  return GUIDE_SECTIONS.find((section) => section.id === id)!;
}

export function getGuideSectionTitle(
  id: GuideSectionId,
  locale: Locale,
): string {
  return getGuideSection(id).title[locale];
}
