import { PageTitleType, TabActiveType } from '../types';

export function myPageTabActive(pathname: string): TabActiveType {
  if (pathname.startsWith('/mypage/events')) {
    return 'events';
  }
  if (pathname.startsWith('/mypage/schedules')) {
    return 'schedules';
  }
  if (pathname.startsWith('/mypage/profile')) {
    return 'profile';
  }
  return null;
}

export function myPageTitle(
  tabActive: string | null,
  t: (key: string) => string,
): PageTitleType {
  return (
    (tabActive &&
      {
        events: t('allEvents'),
        schedules: t('mySchedule'),
        profile: t('profile'),
      }[tabActive]) ||
    null
  );
}
