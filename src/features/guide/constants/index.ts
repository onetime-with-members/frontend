import { GuideSectionId } from '../types';

export const GUIDE_SECTION_ORDER: GuideSectionId[] = [
  'tutorial',
  'my-schedule',
  'use-case',
];

export const GUIDE_SECTION_MESSAGE_KEY: Record<
  GuideSectionId,
  'tutorial' | 'mySchedule' | 'useCase'
> = {
  tutorial: 'tutorial',
  'my-schedule': 'mySchedule',
  'use-case': 'useCase',
};
