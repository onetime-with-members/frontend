'use client';

import { useContext, useEffect } from 'react';

import Navigation from '../components/onboarding/Navigation';
import PageContent from '../components/onboarding/PageContent';
import { FooterContext } from '@/features/set-up/contexts/FooterContext';

export default function OnboardingPage() {
  const { setFooterVisible } = useContext(FooterContext);

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
          <Navigation />
        </header>
        <main className="flex h-full flex-1 flex-col px-4">
          <PageContent />
        </main>
      </div>
    </>
  );
}
