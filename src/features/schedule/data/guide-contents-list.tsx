import { useTranslations } from 'next-intl';

import { GuideContents } from '../types';

export const guideContentsList = (
  t: ReturnType<typeof useTranslations>,
): GuideContents[] => [
  {
    title: t('scheduleGuideModal.title1'),
    description: t.rich('scheduleGuideModal.description1', {
      br: () => <br />,
    }),
    imageSrc: {
      ko: '/images/guide/schedule-modal-1-ko.png',
      en: '/images/guide/schedule-modal-1-en.png',
    },
    imageAlt: {
      ko: '터치 스크롤을 통해 상하좌우 이동이 가능함을 보여주는 가이드 이미지',
      en: 'Guide image showing multi-directional touch scrolling',
    },
  },
  {
    title: t('scheduleGuideModal.title2'),
    description: t.rich('scheduleGuideModal.description2', {
      br: () => <br />,
    }),
    imageSrc: {
      ko: '/images/guide/schedule-modal-2-ko.png',
      en: '/images/guide/schedule-modal-2-en.png',
    },
    imageAlt: {
      ko: '타임블록과 다른 타임블록을 누르면 시작 시간과 끝나는 시간으로 인식되어 해당 타임블록들이 모두 색칠됨을 보여주는 가이드 이미지',
      en: 'Guide image showing how to select a time range by clicking the start and end blocks',
    },
  },
];
