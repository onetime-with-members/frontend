import NavBar from '../../components/NavBar';
import BottomHeroSection from './components/section/BottomHeroSection';
import CardSection from './components/section/CardSection';
import FeatureSection from './components/section/FeatureSection';
import TopSection from './components/section/TopSection';
import TypoSection from './components/section/TypoSection';

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
