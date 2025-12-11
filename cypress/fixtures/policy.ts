export const policyTestCases: {
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
