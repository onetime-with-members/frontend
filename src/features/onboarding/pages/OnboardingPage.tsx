'use client';

import { useContext, useEffect, useState } from 'react';

import Navigation from '../components/Navigation';
import PageContent from '../components/PageContent';
import { FooterContext } from '@/features/set-up/contexts/FooterContext';

export default function OnboardingPage({
  name,
  registerToken,
}: {
  name: string;
  registerToken: string;
}) {
  const [pageIndex, setPageIndex] = useState(0);

  const { setFooterVisible } = useContext(FooterContext);

  function moveToNextPage() {
    setPageIndex((prev) => prev + 1);
  }

  useEffect(() => {
    setFooterVisible(false);
    return () => {
      setFooterVisible(true);
    };
  }, [setFooterVisible]);

  return (
    <>
      <div className="flex flex-1 flex-col md:gap-4">
        <header>
          <Navigation pageIndex={pageIndex} setPageIndex={setPageIndex} />
        </header>
        <main className="flex h-full flex-1 flex-col px-4">
          <PageContent
            name={name}
            registerToken={registerToken}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            moveToNextPage={moveToNextPage}
          />
        </main>
      </div>
    </>
  );
}
