import { useTranslations } from 'next-intl';

export default function TextContent() {
  const t = useTranslations('TalkCalendarShareModal');

  return (
    <div className="flex flex-col gap-1 text-center">
      <h2 className="text-gray-80 text-lg-300">
        {t.rich('title', {
          br: () => <br />,
        })}
      </h2>
      <p className="text-gray-50 text-md-200">
        {t.rich('description', { br: () => <br /> })}
      </p>
    </div>
  );
}
