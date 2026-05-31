import { GuideSectionId } from '../types';

export const GUIDE_SECTION_ORDER: GuideSectionId[] = ['tutorial', 'use-case'];

export const GUIDE_SECTION_MESSAGE_KEY: Record<
  GuideSectionId,
  'tutorial' | 'useCase'
> = {
  tutorial: 'tutorial',
  'use-case': 'useCase',
};
