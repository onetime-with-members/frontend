import NavBar from '@/components/nav-bar';
import { auth, currentUser } from '@/lib/auth';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export async function generateMetadata() {
  const t = await getTranslations('404');

  return {
    title: `${t('notFound')} | OneTime`,
  };
}

export default async function NotFound() {
  const user = (await auth()) ? (await currentUser()).user : null;

  const t = await getTranslations('404');

  return (
    <div className="flex flex-1 flex-col">
      {/* Navigation Bar */}
      <NavBar user={user} />

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="mx-auto flex w-full max-w-screen-md flex-1 items-center justify-center">
          <div className="flex -translate-y-20 flex-col items-center gap-10">
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
    </div>
  );
}
