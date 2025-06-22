import BackButton from './button';
import FormContent from './form-content';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('everytimeScheduleEdit');

  return {
    title: `${t('title')} | OneTime`,
  };
}

export default async function MyScheduleEverytimeEdit() {
  const t = await getTranslations('everytimeScheduleEdit');

  return (
    <>
      {/* Top App Bar */}
      <nav className="h-[64px]">
        <div className="fixed z-10 flex h-[4rem] w-full justify-center bg-gray-00 px-4">
          <div className="relative mx-auto flex w-full max-w-screen-sm">
            <div className="absolute left-0 flex h-full items-center">
              <BackButton />
            </div>
            <div className="flex w-full items-center justify-center whitespace-nowrap text-gray-90 text-lg-300">
              {t('title')}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-4 pb-20 pt-4">
        <FormContent />
      </main>
    </>
  );
}
