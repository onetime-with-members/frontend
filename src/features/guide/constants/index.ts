import { GuideSectionId } from '../types';

export const GUIDE_SECTION_ORDER: GuideSectionId[] = ['tutorial', 'my-schedule'];

export const GUIDE_SECTION_MESSAGE_KEY: Record<
  GuideSectionId,
  'tutorial' | 'mySchedule'
> = {
  tutorial: 'tutorial',
  'my-schedule': 'mySchedule',
};
