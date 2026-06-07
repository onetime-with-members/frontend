import { GuideSectionId, GuideSectionMeta } from '../types';

export const GUIDE_SECTIONS = [
  { id: 'tutorial', title: { ko: '시작하기', en: 'Getting Started' } },
  { id: 'my-schedule', title: { ko: '내 스케줄', en: 'My Schedule' } },
] as const satisfies readonly GuideSectionMeta[];

export const GUIDE_SECTION_ORDER: GuideSectionId[] = GUIDE_SECTIONS.map(
  (section) => section.id,
);
