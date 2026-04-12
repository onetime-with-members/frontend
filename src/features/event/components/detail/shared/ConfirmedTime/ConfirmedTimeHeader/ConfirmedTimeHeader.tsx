import { useTranslations } from 'next-intl';

export default function ConfirmedTimeHeader() {
  const t = useTranslations('event.pages.EventDetailPage.confirm');

  return (
    <div className="flex flex-col items-start pl-1 text-gray-30">
      <h2 className="text-sm-100">{t('confirmedDate')}</h2>
      <div className="my-2 h-px w-full bg-gray-70" />
    </div>
  );
}
