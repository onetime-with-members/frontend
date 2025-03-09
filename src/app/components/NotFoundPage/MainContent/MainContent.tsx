import { useTranslations } from 'next-intl';

import Image from 'next/image';

export default function MainContent() {
  const t = useTranslations('404');

  return (
    <main className="flex-1 px-4">
      <div className="mx-auto flex h-full w-full max-w-screen-md items-center justify-center">
        <div className="flex -translate-y-10 flex-col items-center gap-10">
          <div>
            <Image src="/images/404.svg" alt="404" width={200} height={73} />
          </div>
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
        </div>
      </div>
    </main>
  );
}
