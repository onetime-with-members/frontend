export const memberCases: {
  type: 'USER' | 'GUEST';
  name: '회원' | '비회원';
}[] = [
  { type: 'USER', name: '회원' },
  { type: 'GUEST', name: '비회원' },
];

export const languageCases: {
  locale: string;
  language: string;
}[] = [
  { locale: 'ko', language: '한국어' },
  { locale: 'en', language: '영어' },
];
