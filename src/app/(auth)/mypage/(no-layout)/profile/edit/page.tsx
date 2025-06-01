import { DesktopBackButton, MobileBackButton } from './back-button';
import FormContent from './form-content';
import GrayBackground from '@/components/gray-background';
import NavBar from '@/components/nav-bar';
import { auth, currentUser } from '@/lib/auth';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';

export async function generateMetadata() {
  const t = await getTranslations('profileEdit');

  return {
    title: `${t('editProfile')} | OneTime`,
  };
}

export default async function Page() {
  if (!(await auth())) {
    redirect('/login');
  }

  const user = await currentUser();

  const t = await getTranslations('profileEdit');

  return (
    <>
      {/* Gray Background */}
      <GrayBackground device="desktop" breakpoint="sm" />

      {/* Navigation Bar for Desktop */}
      <NavBar className="hidden sm:flex" />

      {/* App Bar for Mobile */}
      <header className="block h-[67px] sm:hidden">
        <div className="fixed left-0 top-0 z-40 w-full bg-white px-4">
          <div className="mx-auto grid max-w-screen-sm grid-cols-3 py-5">
            <div className="flex items-center">
              <MobileBackButton />
            </div>
            <h2 className="flex items-center justify-center whitespace-nowrap text-center text-gray-90 text-lg-300">
              {t('editProfile')}
            </h2>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Header for Desktop */}
        <div className="mx-auto hidden w-full max-w-[480px] items-center gap-0.5 pb-8 pt-10 text-gray-90 sm:flex">
          <DesktopBackButton />
          <h1 className="title-lg-300">{t('editProfile')}</h1>
        </div>

        {/* Form Content */}
        <FormContent user={user} />
      </main>
    </>
  );
}
