'use client';

import BottomSection from './BottomSection/BottomSection';
import CardSection from './CardSection/CardSection';
import FeatureSection from './FeatureSection/FeatureSection';
import TopSection from './TopSection/TopSection';
import TypoSection from './TypoSection/TypoSection';
import NavBar from '@/components/NavBar/NavBar';

export default function LandingPage() {
  return (
    <>
      <header>
        <NavBar variant="transparent" heightZero />
      </header>
      <main className="w-full">
        <TopSection />
        <FeatureSection />
        <TypoSection />
        <CardSection />
        <BottomSection />
      </main>
    </>
  );
}
