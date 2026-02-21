import { getTranslations } from 'next-intl/server';

export default async function TextContent() {
  const t = await getTranslations('setUp.pages.NotFoundPage');

  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-center text-primary-50 title-sm-300">
        {t.rich('title', {
          br: () => (
            <br className="hidden min-[270px]:block min-[430px]:hidden" />
          ),
        })}
      </h1>
      <p className="text-center text-gray-40 text-md-200">
        {t.rich('description', {
          br: () => <br className="hidden xs:block"></br>,
        })}
      </p>
    </div>
  );
}
