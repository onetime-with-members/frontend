import BottomSection from './BottomSection';
import CardSection from './CardSection';
import FeatureSection from './FeatureSection';
import TopSection from './TopSection';
import TypoSection from './TypoSection';
import NavBar from '@/components/NavBar';

export default function LandingPage() {
  return (
    <>
      <header>
        <NavBar />
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
