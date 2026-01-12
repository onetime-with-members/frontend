const POLICY_TEXTS = {
  ko: {
    privacy: {
      pageTitle: '개인정보 수집 및 이용 동의',
      partOfContent: '제2조(개인정보 처리의 원칙)',
      footerLinkText: '개인정보처리방침',
    },
    service: {
      pageTitle: '서비스 이용약관',
      partOfContent: '제11조(서비스의 제공 및 변경)',
      footerLinkText: '서비스 이용약관',
    },
  },
  en: {
    privacy: {
      pageTitle: 'Privacy Policy',
      partOfContent:
        'Article 2 (Principles of Personal Information Processing)',
      footerLinkText: 'Privacy Policy',
    },
    service: {
      pageTitle: 'Terms of Service',
      partOfContent: 'Article 5 (Formation of the Service Agreement)',
      footerLinkText: 'Terms of Service',
    },
  },
};

export const policyDetailTestCases = (
  [
    { policy: 'privacy', locale: 'ko' },
    { policy: 'service', locale: 'ko' },
    { policy: 'privacy', locale: 'en' },
    { policy: 'service', locale: 'en' },
  ] as const
).map(({ policy, locale }) => {
  const { pageTitle, partOfContent, footerLinkText } =
    POLICY_TEXTS[locale][policy];
  return {
    policy,
    locale,
    pageTitle,
    partOfContent,
    footerLinkText,
    policyName: policy === 'privacy' ? '개인정보처리방침' : '서비스 이용약관',
    language: locale === 'ko' ? '한국어' : '영어',
    url: `/${locale}`,
  };
});

export const policyEditTestCases: {
  service: boolean;
  privacy: boolean;
  marketing: boolean;
  condition: string;
  isDisabled: boolean;
  result: string;
}[] = [
  {
    service: true,
    privacy: true,
    marketing: true,
    condition: '모두 동의',
    isDisabled: false,
  },
  {
    service: true,
    privacy: true,
    marketing: false,
    condition: '필수 정책만 동의',
    isDisabled: false,
  },
  {
    service: true,
    privacy: false,
    marketing: false,
    condition: '서비스 정책만 동의',
    isDisabled: true,
  },
  {
    service: false,
    privacy: true,
    marketing: false,
    condition: '개인정보 정책만 동의',
    isDisabled: true,
  },
  {
    service: true,
    privacy: false,
    marketing: true,
    condition: '필수 정책 중 하나와 선택 정책만 동의',
    isDisabled: true,
  },
].map((testCase) => ({
  ...testCase,
  result: testCase.isDisabled ? '비활성화' : '활성화',
}));
