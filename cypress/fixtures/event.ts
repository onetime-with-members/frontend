export const memberCases: {
  type: 'USER' | 'GUEST';
  name: '회원' | '비회원';
}[] = [
  { type: 'USER', name: '회원' },
  { type: 'GUEST', name: '비회원' },
];

export const exampleEventList: {
  name: string;
  enName: string;
  slug: string;
  title: string;
  recommendedTimes: {
    date: string;
    time: string;
  }[];
  participants: string[];
}[] = [
  {
    name: '팀 회의',
    slug: 'team-meeting',
    enName: 'Team Meetings',
    title: 'OneTime 스프린트 11 계획 회의',
    recommendedTimes: [
      { date: '5월 23일 금요일', time: '23:30 - 24:00' },
      { date: '5월 22일 목요일', time: '23:30 - 24:00' },
    ],
    participants: ['이어령', '구름', '전희수', '홍민서', '한상호'],
  },
  {
    name: '1:1 비즈니스 미팅',
    enName: '1:1 Business Meetings',
    slug: 'business-one-on-one',
    title: 'OneTime 유저 인터뷰 이현수님',
    recommendedTimes: [
      { date: '10월 9일 목요일', time: '19:00 - 24:00' },
      { date: '10월 10일 금요일', time: '19:00 - 24:00' },
    ],
    participants: ['이현수', '홍민서'],
  },
  {
    name: '오프라인 약속',
    enName: 'Social Gatherings',
    slug: 'offline-appointment',
    title: 'OneTime 연말 대면 모임',
    recommendedTimes: [
      { date: '12월 26일 금요일', time: '19:00 - 22:00' },
      { date: '12월 26일 금요일', time: '18:00 - 19:00' },
    ],
    participants: ['이어령', '구름', '전희수', '홍민서', '박채수', '한상호'],
  },
];
