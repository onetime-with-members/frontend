import { useLocale, useTranslations } from 'next-intl';

import { useEventQuery } from '../../api/event.query';
import { getConfirmedTimeSummary } from '../../utils';

export default function useTalkCalendarShare(eventId: string) {
  const locale = useLocale();
  const t = useTranslations(
    'event.pages.EventDetailPage.kakaoShare.talkCalendar',
  );

  const { data: event, isPending } = useEventQuery(eventId);

  if (!event.confirmation) return () => {};

  const confirmedTimeSummary = getConfirmedTimeSummary({
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
        description: t('confirmedDate', { date: confirmedTimeSummary }),
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
          title: t('remindMe'),
          link: {
            webUrl: buttonUrl,
            mobileWebUrl: buttonUrl,
          },
        },
        {
          title: t('viewDetails'),
          link: {
            webUrl: currentUrl,
            mobileWebUrl: currentUrl,
          },
        },
      ],
    });
  };
}
