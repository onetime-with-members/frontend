'use client';

import { useContext } from 'react';

import DesktopHeader from './DesktopHeader';
import DesktopSideTab from './DesktopSideTab';
import NavBar from '@/components/nav-bar';
import { ScrollContext } from '@/contexts/scroll';

export default function DesktopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { scrollContainerRef } = useContext(ScrollContext);

  return (
    <div className="hidden min-h-screen flex-col md:flex">
      <NavBar shadow={false} />
      <div className="mx-auto flex w-full max-w-screen-md gap-10 px-4">
        <DesktopSideTab />
        <main className="relative flex flex-1 flex-col gap-2 pb-20 pt-8">
          <DesktopHeader />
          <div ref={scrollContainerRef} className="flex-1">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
