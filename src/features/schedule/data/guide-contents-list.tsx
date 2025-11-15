import { GuideContents } from '../types';

export const guideContentsList: GuideContents[] = [
  {
    title: '탐색하기',
    description: (
      <>
        상하좌우로 화면을 스크롤하며 <br />
        시간과 날짜를 확인해 보세요
      </>
    ),
    imageSrc: '/images/guide/schedule-pop-up-1.png',
    imageAlt:
      '터치 스크롤을 통해 상하좌우 이동이 가능함을 보여주는 가이드 이미지',
  },
  {
    title: '스케줄 입력하기',
    description: (
      <>
        블럭의 시작과 끝을 터치해서 <br />
        색칠하거나 지울 수 있어요
      </>
    ),
    imageSrc: '/images/guide/schedule-pop-up-2.png',
    imageAlt:
      '터치 스크롤을 통해 상하좌우 이동이 가능함을 보여주는 가이드 이미지',
  },
];
