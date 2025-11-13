import BottomSection from '../components/landing/BottomSection';
import CardSection from '../components/landing/CardSection';
import FeatureSection from '../components/landing/FeatureSection';
import TopSection from '../components/landing/TopSection';
import TypoSection from '../components/landing/TypoSection';
import NavBar from '@/components/NavBar';

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
