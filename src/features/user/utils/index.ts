import { Locale, _Translator } from 'next-intl';

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
  t: _Translator,
): PageTitleType {
  return (
    (tabActive &&
      {
        events: t('MyPageLayout.allEvents'),
        schedules: t('MyPageLayout.mySchedule'),
        profile: t('MyPageLayout.profile'),
      }[tabActive]) ||
    null
  );
}

export function policyPageTitle(name: string, locale: Locale) {
  return name === 'privacy'
    ? locale === 'ko'
      ? '개인정보 수집 및 이용 동의'
      : 'Privacy Policy'
    : locale === 'ko'
      ? '서비스 이용약관'
      : 'Terms of Service';
}
