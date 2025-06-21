import BackButton from './back-button';
import MainContent from './content';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('withdraw');

  return {
    title: `${t('deleteAccount')} | OneTime`,
  };
}

export default function Withdraw() {
  return (
    <>
      {/* Top App Bar */}
      <header className="h-[4rem]">
        <div className="fixed h-[4rem] w-full bg-gray-00 px-4">
          <div className="mx-auto w-full max-w-screen-sm">
            <div className="flex w-full items-center justify-end py-5">
              <BackButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <MainContent />
    </>
  );
}
