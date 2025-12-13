export const policyDetailTestCases: {
  name: string;
  locale: 'ko' | 'en';
  url: string;
  partOfContent: string;
}[] = [
  {
    name: '개인정보 수집 및 이용 동의',
    locale: 'ko',
    url: '/policy/privacy',
    partOfContent: '제2조(개인정보 처리의 원칙)',
  },
  {
    name: '서비스 이용약관',
    locale: 'ko',
    url: '/policy/service',
    partOfContent: '제11조(서비스의 제공 및 변경)',
  },
  {
    name: 'Privacy Policy',
    locale: 'en',
    url: '/policy/privacy',
    partOfContent: 'Article 2 (Principles of Personal Information Processing)',
  },
  {
    name: 'Terms of Service',
    locale: 'en',
    url: '/policy/service',
    partOfContent: 'Article 5 (Formation of the Service Agreement)',
  },
];

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
