import MobileBackButton from './back-button';
import ScrollContainerWrapper from './scroll';
import SideTab from './side-tab';
import PenIcon from '@/components/icon/pen';
import NavBar from '@/components/nav-bar';
import { mypageTabActive } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import Link from 'next/link';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = (await headers()).get('x-pathname') || '';
  const tabActive = mypageTabActive(pathname);

  const t = await getTranslations('mypage');

  const pageTitle: string | React.ReactNode =
    tabActive &&
    {
      events: t('allEvents'),
      schedules: t('mySchedule'),
      profile: t('profile'),
    }[tabActive];

  return (
    <>
      {/* Mobile */}
      <div className="block md:hidden">
        <header>
          <nav className="h-[4rem]">
            <div className="fixed z-50 flex h-[4rem] w-full justify-center bg-gray-00 px-4">
              <div className="mx-auto grid w-full max-w-screen-md grid-cols-3">
                <div className="flex items-center justify-start">
                  <MobileBackButton />
                </div>
                <h1 className="flex items-center justify-center whitespace-nowrap text-gray-90 text-lg-300">
                  {pageTitle}
                </h1>
                <div className="flex items-center justify-end">
                  {tabActive === 'schedules' && (
                    <Link href="/mypage/schedules/edit">
                      <PenIcon fill="#31333F" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </header>
        <main className="pb-20">{children}</main>
      </div>

      {/* Desktop */}
      <div className="hidden min-h-screen flex-col md:flex">
        <NavBar shadow={false} />
        <div className="px-4">
          <div className="mx-auto flex w-full max-w-screen-md gap-10">
            <SideTab />
            <main className="relative flex flex-1 flex-col gap-2 pb-20 pt-8">
              <header className="sticky top-[64px] z-20 flex items-center justify-between bg-gray-00 py-2">
                <h1 className="text-[1.75rem] font-semibold">{pageTitle}</h1>
                {tabActive === 'schedules' && (
                  <Link href="/mypage/schedules/edit">
                    <PenIcon fill="#31333F" />
                  </Link>
                )}
              </header>
              <ScrollContainerWrapper>{children}</ScrollContainerWrapper>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
