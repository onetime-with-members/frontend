export const SERVER_API_URL =
  process.env.SERVER_API_URL ||
  process.env.NEXT_PUBLIC_SERVER_API_URL ||
  'http://localhost:3000';
export const CRAWLING_SERVER_API_URL =
  process.env.CRAWLING_SERVER_API_URL ||
  process.env.NEXT_PUBLIC_CRAWLING_SERVER_API_URL ||
  'http://localhost:3000';
export const CRAWLING_SERVER_API_KEY =
  process.env.CRAWLING_SERVER_API_KEY ||
  process.env.NEXT_PUBLIC_CRAWLING_SERVER_API_KEY ||
  'secretkey';

export const LOCALES = ['ko', 'en'] as const;
export const POLICY_KEY_LIST = ['privacy', 'service'] as const;

export const weekdaysShortKo = ['일', '월', '화', '수', '목', '금', '토'];
export const weekdaysShortEn = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];

export const breakpoint = {
  sm: 640,
  md: 768,
};

export const SKELETON_GRAY = '#e8e9ed77';
export const SKELETON_DARK_GRAY = '#dadbe277';
export const SKELETON_TOOLBAR_TITLE_COLOR = '#404251';
export const SKELETON_TOOLBAR_TITLE_HIGHLIGHT_COLOR = '#585a70';

export const languages: { key: 'ko' | 'en'; label: string }[] = [
  { key: 'ko', label: '한국어' },
  { key: 'en', label: 'English' },
];
