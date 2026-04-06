import { useTranslations } from 'next-intl';

export default function ModalConfirmButton({
  calendarEventId,
  onClick,
}: {
  onClick: () => void;
  calendarEventId: string;
}) {
  const t = useTranslations('event.components.TalkCalendarSuccessModal');

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
