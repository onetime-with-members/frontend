import { useLocale } from 'next-intl';

import { useEventQuery } from '../../api/event.query';
import { getConfirmedTimeText } from '../../utils';

export default function useTalkCalendarShare(eventId: string) {
  const locale = useLocale();

  const { data: event, isPending } = useEventQuery(eventId);

  if (!event.confirmation) return () => {};

  const confirmedTimeSummary = getConfirmedTimeText({
    confirmedTime: event.confirmation,
    category: event.category,
    locale,
  });

  return () => {
    if (isPending) return;

    const currentUrl = location.href;
    const buttonUrl = `${location.origin}/events/talk-calendar?${new URLSearchParams(
      {
        event_id: eventId,
      },
    )}`;

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${event.title} | OneTime`,
        description: `확정된 일정 : ${confirmedTimeSummary}`,
        imageUrl: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/images/kakao/talk-calendar-share-thumbnail.png`,
        imageWidth: 1200,
        imageHeight: 630,
        link: {
          webUrl: currentUrl,
          mobileWebUrl: currentUrl,
        },
      },
      buttons: [
        {
          title: '카톡 알림 추가',
          link: {
            webUrl: buttonUrl,
            mobileWebUrl: buttonUrl,
          },
        },
        {
          title: '자세히 보기',
          link: {
            webUrl: currentUrl,
            mobileWebUrl: currentUrl,
          },
        },
      ],
    });
  };
}
