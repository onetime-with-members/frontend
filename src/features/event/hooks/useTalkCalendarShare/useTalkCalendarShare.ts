import { useEventQuery } from '../../api/event.query';

export default function useTalkCalendarShare(eventId: string) {
  const { data: event, isPending } = useEventQuery(eventId);

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
        description: `톡캘린더 일정 추가 요청이 도착했습니다.`,
        imageUrl: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/images/kakao/talk-calendar-share-thumbnail.png`,
        link: {
          webUrl: currentUrl,
          mobileWebUrl: currentUrl,
        },
      },
      buttons: [
        {
          title: '일정 추가하러 가기',
          link: {
            webUrl: buttonUrl,
            mobileWebUrl: buttonUrl,
          },
        },
      ],
    });
  };
}
