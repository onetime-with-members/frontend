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
    title: '원타임 스프린트 계획 회의 (예시)',
    recommendedTimes: [
      { date: '5월 23일 금요일', time: '23:30 - 24:00' },
      { date: '5월 22일 목요일', time: '23:30 - 24:00' },
    ],
    participants: ['이지우', '구하은', '전예린', '홍시우', '한태영'],
  },
  {
    name: '1:1 비즈니스 미팅',
    enName: '1:1 Business Meetings',
    slug: 'business-one-on-one',
    title: '원타임 유저 인터뷰 이재현님 (예시)',
    recommendedTimes: [
      { date: '10월 9일 목요일', time: '19:00 - 24:00' },
      { date: '10월 10일 금요일', time: '19:00 - 24:00' },
    ],
    participants: ['이재현', '홍시우'],
  },
  {
    name: '오프라인 약속',
    enName: 'Social Gatherings',
    slug: 'social-gatherings',
    title: '원타임 연말 대면 모임 (예시)',
    recommendedTimes: [
      { date: '12월 26일 금요일', time: '19:00 - 22:00' },
      { date: '12월 26일 금요일', time: '18:00 - 19:00' },
    ],
    participants: ['이지우', '구하은', '전예린', '홍시우', '박수민', '한태영'],
  },
];
