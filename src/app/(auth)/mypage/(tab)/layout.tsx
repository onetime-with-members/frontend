import { DesktopHeader, MobileHeader } from './header';
import ScrollContainerWrapper from './scroll';
import SideTab from './side-tab';
import NavBar from '@/components/nav-bar';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Mobile */}
      <div className="block md:hidden">
        <MobileHeader />
        <main className="pb-20">{children}</main>
      </div>

      {/* Desktop */}
      <div className="hidden min-h-screen flex-col md:flex">
        <NavBar shadow={false} />
        <div className="px-4">
          <div className="mx-auto flex w-full max-w-screen-md gap-10">
            <SideTab />
            <main className="relative flex flex-1 flex-col gap-2 pb-20 pt-8">
              <DesktopHeader />
              <ScrollContainerWrapper>{children}</ScrollContainerWrapper>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
