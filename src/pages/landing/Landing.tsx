import NavBar from '../../components/NavBar';
import BottomHeroSection from './components/BottomHeroSection';
import CardSection from './components/CardSection';
import FeatureSection from './components/FeatureSection';
import TopSection from './components/TopSection';
import TypoSection from './components/TypoSection';

export default function Landing() {
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
        <BottomHeroSection />
      </main>
    </>
  );
}
