import { useTranslations } from 'next-intl';

export default function ModalTextContent() {
  const t = useTranslations('event.components.TalkCalendarSuccessModal');

  return (
    <div className="flex flex-col gap-1 text-center text-gray-70">
      <h2 className="title-sm-300">{t('title')}</h2>
      <p className="text-md-100">
        {t.rich('description', {
          bold: (chunks) => (
            <strong className="text-primary-50 text-md-300">{chunks}</strong>
          ),
          visual: (chunks) => <span aria-hidden={true}>{chunks}</span>,
          sr: (chunks) => <span className="sr-only">{chunks}</span>,
        })}
      </p>
    </div>
  );
}
