import { useTranslations } from 'next-intl';

import { useSearchParams } from 'next/navigation';

export default function ModalConfirmButton({
  onClick,
}: {
  onClick: () => void;
}) {
  const t = useTranslations('event.components.TalkCalendarSuccessModal');
  const searchParams = useSearchParams();

  const calendarEventId = searchParams.get('calendar_event_id');

  return (
    <a
      href={`https://calendar.kakao.com/schedule/${calendarEventId}`}
      target="_blank"
      role="button"
      className="flex h-14 items-center justify-center rounded-2xl bg-gray-80 text-gray-00 transition-colors duration-150 text-lg-200 hover:bg-gray-90 active:bg-gray-90"
      onClick={onClick}
    >
      {t('confirmButton')}
    </a>
  );
}
